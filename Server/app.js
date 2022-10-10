const express = require('express')
const app = express()
const port = 5000

const path=require("path") 
let publicPath= path.resolve(__dirname,"public") 
app.use(express.static(publicPath))

app.get("/" , (res, req) => {
res.send("HI!")
})
