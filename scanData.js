const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();
const requestBody = require("./request");
const sendMessageToTelegram = require("./telegram-bot");
const getLinkOrigin = require("./getLinkOrigin");
const axios = require("axios");
const moment = require("moment");

const writeListVideoId = (listVideoId) => {
  fs.writeFileSync("listId.txt", listVideoId, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
const writeFileJSON = (text) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `data/${year}-${month}-${day}.json`;
  fs.writeFileSync(formattedDate, JSON.stringify(text, null, 4), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
const readFileListJSONVideos = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `data/${year}-${month}-${day}.json`;
  return new Promise((resolve, reject) => {
    fs.readFile(formattedDate, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        resolve([]);
        return;
      }

      const jsonData = JSON.parse(data);
      resolve(jsonData);
    });
  });
};
const readFileListVideoId = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./listId.txt", "utf8", (err, data) => {
      if (err) {
        resolve([]);
        return;
      }
      const listVideoId = data.split(",").filter((item) => item !== "");
      resolve(listVideoId);
    });
  });
};
const getNumberFromComment = (text) => {
  const numberString = text.replace(/\./g, "").split(" ")[1];
  const number = parseInt(numberString, 10);
  return number;
};
const convertDate = (text) => {
  const dateObj = moment(text, "D [thg] M, YYYY");
  const timestamp = dateObj.valueOf();
  return timestamp;
};
const getNumberFromView = (text) => {
  const numberString = text.replace(/\./g, "").split(" ")[0];

  // Chuyển chuỗi số thành số nguyên
  const number = parseInt(numberString, 10);

  return number;
};
const getShortVideoById = async (videoId) => {
  try {
    const req = requestBody(videoId);
    const res = await axios.post(
      "https://www.youtube.com/youtubei/v1/reel/reel_item_watch?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=true",
      req
    );
    const likeCount =
      res.data.overlay.reelPlayerOverlayRenderer.likeButton.likeButtonRenderer
        .likeCount;
    const commentCount = getNumberFromComment(
      res.data.overlay.reelPlayerOverlayRenderer.viewCommentsButton
        .buttonRenderer.accessibility.label
    );
    const linkThumbnail = `https://i.ytimg.com/vi/${videoId}/hq2.jpg`;

    const viewCount = getNumberFromView(
      res.data.engagementPanels[1].engagementPanelSectionListRenderer.content
        .structuredDescriptionContentRenderer.items[0]
        .videoDescriptionHeaderRenderer.views.simpleText
    );
    const title =
      res.data.engagementPanels[1].engagementPanelSectionListRenderer.content
        .structuredDescriptionContentRenderer.items[0]
        .videoDescriptionHeaderRenderer.title.runs[0].text;
    const publishDate = convertDate(
      res.data.engagementPanels[1].engagementPanelSectionListRenderer.content
        .structuredDescriptionContentRenderer.items[0]
        .videoDescriptionHeaderRenderer.publishDate.simpleText
    );
    const username =
      res.data.engagementPanels[1].engagementPanelSectionListRenderer.content
        .structuredDescriptionContentRenderer.items[0]
        .videoDescriptionHeaderRenderer.channel.simpleText;

    const avatar =
      res.data.overlay.reelPlayerOverlayRenderer
        .reelPlayerHeaderSupportedRenderers.reelPlayerHeaderRenderer
        .channelThumbnail?.thumbnails[2].url;
    const origin_link = "https://www.youtube.com/shorts/" + videoId;

    return {
      title: title,
      id: videoId,
      img: [],
      avatar,
      created_at: publishDate,
      video: [
        {
          link: 2,
          thumbnail: linkThumbnail,
        },
      ],
      likeCount,
      viewCount,
      commentCount,
      username,
      origin_link,
    };
  } catch (error) {
    const sendMessageResult = sendMessageToTelegram(`loi cao lai!!`);
    if (!sendMessageResult) {
      console.log("Error: Failed to send message to Telegram");
    }
    console.log("Error:", error);
    return {
      video: [
        {
          thumbnail: undefined,
        },
      ],
    };
  }
};

const scan = async () => {
  try {
    sendMessageToTelegram(`bắt đầu scan sl: ${process.env.SCANS}`);
    const startTime = performance.now();
    const browser = await puppeteer.launch({
      headless: JSON.parse(process.env.HEADLESS || "true"),
      // executablePath: process.env.BROWSER,
    });
    const page = await browser.newPage();

    // Điều hướng đến trang YouTube Shorts
    await page.goto("https://www.youtube.com/shorts");

    // Chờ cho phần tử thumbnail được tải
    await page.waitForSelector("#thumbnail");
    await page.waitForTimeout(1000);

    let listVideoId = await readFileListVideoId();
    let fileJson = await readFileListJSONVideos();
    console.log(listVideoId.length);
    let count = 0;
    let countReset = 0;
    while (count < process.env.SCANS) {
      if (countReset == 10) {
        countReset = 0;
        await page.goto("https://www.youtube.com/shorts");
        await page.waitForTimeout(1000);
      }
      if (count % 10 == 0) {
        await writeFileJSON(fileJson);
        await writeListVideoId(listVideoId.toString());
      }
      await page.keyboard.press("ArrowDown");
      const videoURL = await page.url();
      const videoID = videoURL.split("/").pop();

      if (await !listVideoId.includes(videoID)) {
        const video = await getShortVideoById(videoID);
        const link = await getLinkOrigin(videoURL);
        if (
          link &&
          video.video[0].thumbnail &&
          (video.commentCount > process.env.MORE_COMMENTCOUNT ||
            video.likeCount > process.env.MORE_LIKECOUNT ||
            video.viewCount > process.env.MORE_VIEWCOUNT)
        ) {
          video.video[0].link = link;
          listVideoId.push(videoID);
          fileJson.push(video);
          console.log(video);
          count++;
          countReset = 0;
          continue;
        }
      }
      countReset++;
      await page.waitForTimeout(1000);
      console.log("next");
    }
    await writeFileJSON(fileJson);
    await writeListVideoId(listVideoId.toString());

    await browser.close();
    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000;

    sendMessageToTelegram(
      `kết thúc scan thời gian scan: ${executionTime}s số lượng scan:${fileJson.length}`
    );
  } catch (error) {
    console.log("Error: ", error);
  }
};
module.exports = scan;
