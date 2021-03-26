"use strict"

const express = require("express")

const reportController = require("./controllers/report-controller")
const investmentsController = require("./controllers/investments-controller")

const app = express()

app.use(express.json({limit: "10mb"}))

app.post("/investments/report", reportController.store)
app.get("/investments/report", reportController.show)

app.get("/investments/:id", investmentsController.show)

module.exports = app
