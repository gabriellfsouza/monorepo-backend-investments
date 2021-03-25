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
    await newReportService.run()
    return res.status(204).send()
  },

  /**
   * @param {Request} _ Request
   * @param {Response} res Response
   */
  show: async (_, res) =>{
    const str = await genCsvStrService.run()
    return res.type("text").attachment("report.csv").send(str)
  },
}


module.exports = reportController
