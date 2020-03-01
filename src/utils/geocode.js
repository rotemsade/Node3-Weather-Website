const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm90ZW1zYWRlNzEiLCJhIjoiY2puOHJxczBuM3ZzYzNwcXZjam1wZWM2OSJ9.6C7k_cp6W87xS-PDuIRi5w&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.message) {
      callback("Unable to connect to location services!");
    } else if (!body.features[0]) {
      callback("Unable to find location data");
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;
