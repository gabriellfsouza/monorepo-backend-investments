const express = require("express")
const fileUpload = require("express-fileupload")
const config = require("config")
const investmentsController = require("./controllers/investments-controller")
const invReportController = require("./controllers/inv-report-controller")

const app = express()

app.use(express.text())
app.use(express.json({limit: "10mb"}))
app.use(fileUpload())

app.get("/investments", investmentsController.index)
app.get("/investments/:id", investmentsController.show)
app.post("/investments/export", invReportController.store)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
