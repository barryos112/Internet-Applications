
// const express = require('express')
// // const { Server } = require('http')
// const axios = require('axios');
// require('dotenv').config();

// const app = express()
// const port = 3000

// API_KEY = process.env.API_KEY;

// class weatherInfo{
//    constructor(city){
//     this.city = city;
//     this.weather = {
//         main: "",
//         description: ""
//     }
//     this.location = {
//         longitude: 0,
//         latitude: 0
// }
//     this.temp = 0;
//     this.windSpeed = 0;
//     // this.airPollution = 0;
//    }


// }

// app.get('/', async (req, res) => {
//     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${API_KEY}&units=metric`).then((response) => {
//       res.send(response.data);
//     })
//   })

// app.get('/rainfall' , async (req , res) =>{
//     let city = req.query.city
//     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${API_KEY}&units=metric`).then((response) => {
//     res.send(response.data.weather[0].main);
// })
// })

// app.listen(port, () => {
//     console.log('Listening')
// })

// async function callAPI(city){
// currentWeather = new weatherInfo(city)

//     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
//     data = response.data
//     console.log(data)
//     return currentWeather;

//         }).catch((e) => {
//         console.log("error!!!!")
//     })

// }

// Require node_modules

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Configure dotenv package

require('dotenv').config();

// Set up our openweathermap API_KEY

const apiKey = `${process.env.API_KEY}`;

// Setup our express app and body-parser configurations
// Setup our javascript template view engine
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');

// Setup our default display on launch
app.get('/', function(req, res) {

    // It shall not fetch and display any data in the index page
    res.render('index', { weather: null, error: null });
});

// On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/', function(req, res) {

    // Get city name passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);

            // We shall output it in the console just to make sure that the data being displayed is what we want
            console.log(weather);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up our output
                let place = `${weather.name}, ${weather.sys.country}`,
                    /* We shall calculate the current timezone using the data fetched*/
                    weatherTimezone = `${new Date(weather.dt * 1000 - (weather.timezone * 1000))}`;
                let weatherTemp = `${weather.main.temp}`,
                    weatherPressure = `${weather.main.pressure}`,
                    /* We shall fetch the weather icon and its size using the icon data*/
                    weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    weatherDescription = `${weather.weather[0].description}`,
                    humidity = `${weather.main.humidity}`,
                    clouds = `${weather.clouds.all}`,
                    visibility = `${weather.visibility}`,
                    main = `${weather.weather[0].main}`,
                    weatherFahrenheit;
                weatherFahrenheit = ((weatherTemp * 9 / 5) + 32);

                // We shall also round off the value of the degrees fahrenheit calculated into two decimal places
                function roundToTwo(num) {
                    return +(Math.round(num + "e+2") + "e-2");
                }
                weatherFahrenheit = roundToTwo(weatherFahrenheit);

                // We shall now render the data to our page (index.ejs) before displaying it out
                res.render('index', { weather: weather, place: place, temp: weatherTemp, pressure: weatherPressure, icon: weatherIcon, description: weatherDescription, timezone: weatherTimezone, humidity: humidity, fahrenheit: weatherFahrenheit, clouds: clouds, visibility: visibility, main: main, error: null });
            }
        }
    });
});

// We shall set up our port configurations
app.listen(5000, function() {
    console.log('Weather app listening on port 5000!');
});
