const request = require("request");

const forecast = (latitude, longitude, units, callback) => {
  var url;
  if (units) {
    url =
      "https://api.darksky.net/forecast/6b057e25429ab973ada236c94068510a/" +
      latitude +
      "," +
      longitude +
      "?units=" +
      units;
  } else {
    url =
      "https://api.darksky.net/forecast/6b057e25429ab973ada236c94068510a/" +
      latitude +
      "," +
      longitude;
  }

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      switch (body.code) {
        case 400:
          callback("Unable to find location!");
          break;
        case 403:
          callback("Unable to connect to weather service!");
          break;
        default:
          break;
      }
    } else {
      callback(undefined, {
        dailyForecast:
          body.daily.data[0].summary +
          " It is currently " +
          Math.round(parseFloat(body.currently.temperature)) +
          " degress out. There is a " +
          Math.round(parseFloat(body.currently.precipProbability, 10) * 100) +
          "% chance of rain.",
        todayHighLow:
          "Today's high is " +
          Math.round(parseFloat(body.daily.data[0].temperatureHigh)) +
          " degress and " +
          Math.round(parseFloat(body.daily.data[0].temperatureLow)) +
          " degress low."
      });
    }
  });
};

module.exports = forecast;
