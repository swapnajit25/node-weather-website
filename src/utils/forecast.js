const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3aea87579e5e0ed5640be0681dc5039c&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather forecast", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.temperature +
          " currently, feels like " +
          body.current.feelslike +
          ", Outside: " +
          body.current.weather_descriptions[0] +
          " with humidity " +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
