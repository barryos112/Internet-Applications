
const express = require('express')
const { Server } = require('http')
const app = express()
const port = 5000

const path=require("path") 
let publicPath= path.resolve(__dirname,"public") 
app.use(express.static(publicPath))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', function(req, res, next) {
    res.send("Hello world");
});
