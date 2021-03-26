const express = require("express")
const fileUpload = require("express-fileupload")

const investmentsController = require("./controllers/investments-controller")
const invReportController = require("./controllers/inv-report-controller")

const app = express()

app.use(express.text())
app.use(express.json({limit: "10mb"}))
app.use(fileUpload())

app.get("/investments", investmentsController.index)
app.get("/investments/:id", investmentsController.show)
app.post("/investments/export", invReportController.store)

module.exports = app
