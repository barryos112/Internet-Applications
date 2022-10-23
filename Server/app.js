const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});

app.get("/weather", async (req, res) => {
  let city = req.query.city;
  let weather = {
    city: "",
    country: "",
    timezone: 0,
    sunrise: 0,
    sunset: 0,
    coord: {
      lat: 0,
      lon: 0,
    },
    forecast: [
      {
        number: 0,
        weather: {
          main: "Clear",
          desc: "No clouds in the sky.",
          temperature: 8,
          wind_speed: 25,
          rain_level: 25,
          air_pollution: 32,
        },
      },
    ],
  };

  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
      return (payload = response.data);
    })
    .then((payload) => {
      weather.city = payload.city.name;
      weather.country = payload.city.country;
      weather.timezone = payload.city.timezone;
      weather.sunrise = payload.city.sunrise;
      weather.sunset = payload.city.sunset;
      weather.coord = {
        lat: payload.city.coord.lat,
        lon: payload.city.coord.lon,
      };
      for (let i = 0; i < 6; i++) {
        weather.forecast[i] = {
          number: i,
          weather: {
            main: payload.list[i].weather[0].main,
            desc: payload.list[i].weather[0].description,
            temperature: payload.list[i].main.temp,
            wind_speed: payload.list[i].wind.speed,
          },
        };

        if (payload.list[i].rain != null) {
          weather.forecast[i].weather["rain_level"] =
            payload.list[i].rain["3h"];
        }
      }
      return weather;
    })
    .then(async (weather) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${API_KEY}`
        )
        .then((response) => {
          return (payload = response.data);
        })
        .then((payload) => {
          for (let i = 0; i < 6; i++) {
            weather.forecast[i].weather["air_pollution"] =
              payload.list[i].components.pm2_5;
          }
          res.send(weather);
        });
    });
});
