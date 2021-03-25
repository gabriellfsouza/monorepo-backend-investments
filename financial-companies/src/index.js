const express = require("express")
const config = require("config")
const companiesController = require("./controllers/companies-controller")

const app = express()

app.get("/companies", companiesController.index)

app.get("/companies/:id", companiesController.show)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
