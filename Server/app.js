// const request = require("request");

// const express = require('express')
// const { Server } = require('http')
// const app = express()
// const port = 5000

// const path=require("path") 
// let publicPath= path.resolve(__dirname,"public") 
// app.use(express.static(publicPath))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.get('/', function(req, res, next) {
//     res.send("Hello world");
// });

const request = require("request");
const express = require("express");
const HTTP_PORT = process.env.HTTP_PORT || 3001;
require("dotenv").config();
const app = express();

let bodyContent = null;

request.get(
  `${process.env.BASE_URL}weather?q=Raleigh,NC,US&appid=${process.env.API_KEY}`,
  function (err, res, body) {
    if (!err && res.statusCode == 200) {
      // Successful response
      console.log(body); // Displays the response from the API
      bodyContent = body;
    } else {
      console.log(err);
      bodyContent = err;
    }
  }
);

app.get("/weatherData", (req, res) => {
  res.jsonp(bodyContent);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server is  listening at http://localhost:${HTTP_PORT}`);
});