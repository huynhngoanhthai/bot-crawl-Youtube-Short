require("dotenv").config();
const schedule = require("node-schedule");
const fs = require("fs");
const express = require("express");
const scan = require("./scanData");
const app = express();
const port = parseInt(process.env.PORT || 3000);

//dailyJob 00:01
schedule.scheduleJob("1 0 * * *", async () => {
  scan();
});

//weeklyJob xoa het du lieu trong listId.txt 22:00
schedule.scheduleJob("0 22 */3 * *", () => {
  fs.writeFileSync("listId.txt", "", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
});

const readFileData = async (date) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/" + date + ".json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        resolve([]);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve([]);
        }
      }
    });
  });
};
app.get("/api/crawler/youtube-short", async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const data = await readFileData(formattedDate);

  res.json({
    success: true,
    data,
  });
});
app.get("/api/data/:filename", async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `data/${year}-${month}-${day}.json`;
  const date = req.params.filename | formattedDate;
  const data = await readFileData(date);

  res.json({
    success: true,
    data,
  });
});

app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
