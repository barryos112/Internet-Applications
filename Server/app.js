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

// ------------
// Controllers
// ------------
app.get("/", async (req, res) => {
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
      res.send(response.data);
    });
});

app.get("/data", async (req, res) => {
  let city = req.query.city;
  let weatherData = {};

  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    .then((response) => {
      weatherData["main_data"] = response.data;
    })
    .then(async () => {
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.main_data.coord.lat}&lon=${weatherData.main_data.coord.lon}&appid=${API_KEY}`
        )
        .then((response) => {
          weatherData["pollution_data"] = response.data;
          res.send(weatherData);
        });
    })
    .catch((e) => {
      console.log(e);
    });
});
