// imports with commonJS
const express = require('express');
const AlienInvasion = require("../model/AlienInvasion.js")
const qs = require("qs");

const app = express();
const port = 3000;

// middleware stuff such that express parses JSON correctly
app.use(express.json());

// more middleware to allow proper parsing of query parameters
app.set("query parser",
  (str) => qs.parse(str)
);

// maintaining the alien invasion
let alienInvasion = new AlienInvasion();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Setting up health check route!
app.get("/healthcheck", (req, res) => {
  res.status(200).send("Server is Healthy!");
})

// Setting up the POST of the aliens endpoint
app.post("/api/aliens", (req, res) => {
  const input = req.body;
  if (!Array.isArray(input)) {
    res.status(400).send("Input needs to be an array of Detailed Aliens!");
  } else {
    // try to send the alien invasion info, otherwise return a 406 status
    try {
      res.status(202).send("This is the alien invasion information after your request! " + alienInvasion.pushAliens(input));
    } catch (e) {
      res.status(406).send(e.message);
    }
  }
})

// the GET method for aliens
app.get("/api/aliens", (req, res) => {
  const queryInfo = req.query;
  // try to process the query, otherwise something is wrong with query values
  try {
    res.send("Here are the aliens that match your query! " + alienInvasion.acceptQuery(queryInfo));
  } catch (e) {
    res.status(422).send("Invalid type of values for queries! " + e.message);
  }
})

// the DELETE method for aliens
app.delete("/api/aliens", (req, res) => {
  alienInvasion = new AlienInvasion();
  res.send("Alien invasion cleared!");
})

app.listen(port, () => {
  console.log(`Alien's listening at: http://localhost:${port}`)
})
