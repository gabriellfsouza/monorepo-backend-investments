const {promises} = require("fs")
const {resolve} = require("path")

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const invReportController = {

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  store: async (req, res) => {
    try {
      const content = `${req.files.report.data}`
      console.log("Body received", content)

      await promises
        .writeFile(
          resolve(__dirname, "..", "..", "..", "uploads",
            `${Date.now()}-${req.files.report.name}`,
          ), req.files.report.data)

      return res.sendStatus(204)
    } catch (error) {
      return res.status(501).send()
    }
  },
}

module.exports = invReportController
