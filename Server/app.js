
const express = require('express')
// const { Server } = require('http')
const axios = require('axios');
require('dotenv').config();

const app = express()
const port = 3000

API_KEY = process.env.API_KEY;

class weatherInfo{
   constructor(city){
    this.city = city;
    this.weather = {
        main: "",
        description: ""
    }
    this.location = {
        longitude: 0,
        latitude: 0
}
    this.temp = 0;
    this.windSpeed = 0;
    // this.airPollution = 0;
   }


}

app.get('/', async (req, res) => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=${API_KEY}&units=metric`).then((response) => {
      res.send(response.data);
    })
  })

app.get('/rainfall' , (req , res) =>{
    res.send(callAPI("Dublin"));
})

app.listen(port, () => {
    console.log('Listening')
})

async function callAPI(city){
currentWeather = new weatherInfo(city)

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then((response) => {
    data = response.data
    console.log(data)
    return currentWeather;

        }).catch((e) => {
        console.log("error!!!!")
    })

}
