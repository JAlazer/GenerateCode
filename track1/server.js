const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Setting up health check route!
app.get("/healthcheck", (req, res) => {
    res.status(200).send("Server is Healthy!")
})

// Setting up the POST of the aliens endpoint
app.post("/api/aliens", (req, res, next) => {
    // TODO:
})

// the GET method for aliens
app.get("/api/aliens", (req, res, next) => {
    // TODO: 
})

// the DELETE method for aliens
app.delete("/api/aliens", (req, res) => {
    // TODO:
})

app.listen(port, () => {
  console.log(`Alien's listening at: http://localhost:${port}`)
})
