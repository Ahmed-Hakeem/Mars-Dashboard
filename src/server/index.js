require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/rovers", (req, response) => {
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${req.header(
      "roverName"
    )}/photos?sol=1000&api_key=${process.env.API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      response.send(res);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
