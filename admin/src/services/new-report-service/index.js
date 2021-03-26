const {exportReport} = require("../../api/investments-api/investments/export")
const genCsvStrService = require("../gen-csv-str-service")

/**
 * Generates and process the report upload into the Investments service
 */
const newReportService = {
  run: async ()=>{
    const stringReport = await genCsvStrService.run()
    return exportReport(stringReport)
  },
}
module.exports = newReportService
