const express = require("express")
const companiesController = require("./controllers/companies-controller")

const app = express()

app.get("/companies", companiesController.index)

app.get("/companies/:id", companiesController.show)

module.exports = app
