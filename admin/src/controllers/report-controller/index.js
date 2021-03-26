/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const newReportService = require("../../services/new-report-service")
const genCsvStrService = require("../../services/gen-csv-str-service")


const reportController = {

  /**
   * @param {Request} _ Request
   * @param {Response} res Response
   */
  store: async (_, res)=>{
    try {
      await newReportService.run()
      return res.status(204).send()
    } catch (error) {
      console.trace("Server error", error)
      return res.status(500).send(error.message)
    }
  },

  /**
   * @param {Request} _ Request
   * @param {Response} res Response
   */
  show: async (_, res) =>{
    try {
      const str = await genCsvStrService.run()
      return res.type("text").attachment("report.csv").send(str)
    } catch (error) {
      console.trace("Server error", error)
      return res.status(500).send(error.message)
    }
  },
}


module.exports = reportController
