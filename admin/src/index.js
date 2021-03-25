const express = require("express")
const config = require("config")

const reportController = require("./controllers/report-controller")
const investmentsController = require("./controllers/investments-controller")

const app = express()

app.use(express.json({limit: "10mb"}))

app.post("/investments/report", reportController.store)
app.get("/investments/report", reportController.show)

app.get("/investments/:id", investmentsController.show)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
