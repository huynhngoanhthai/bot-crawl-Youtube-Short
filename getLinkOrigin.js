const axios = require("axios");

const getYouTubeVideoURL = async (link) => {
  try {
    const res = await axios.get(link);
    const regex = /https:\/\/rr[^"]*/g;
    const matches = res.data.match(regex);
    // const sig = res.data.match(/https:\/\/rr[^"]*/g);
    const checkLink = await matches.filter((match) => {
      if (match.includes("\\u0026")) {
        return true;
      }
    });
    // console.log(sig);
    // if (checkLink.length == 0) {
    //   return null;
    // }
    const result = matches[0].replace(
      /\\u0026|%26|%3F|%3D|%253D|%252C|%252F/g,
      (match) => {
        if (match == "\\u0026" || match == "%26") {
          return "&";
        }
        if (match == "%3F") {
          return "?";
        }
        if (match == "%3D") {
          return "=";
        }
        if (match == "%253D") {
          return "%3D";
        }
        if (match == "%252C") {
          return "%2C";
        }
        if (match == "%252F") {
          return "%2F";
        }
      }
    );
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = getYouTubeVideoURL;
