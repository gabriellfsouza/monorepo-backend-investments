const FormData = require("form-data")

const investmentsApi = require("..")
const {errorHandler} = require("../..")

const basePath = "investments/export"

/**
 * @param {String} content csv string
 */
module.exports.exportReport = async function(content) {
  const form = new FormData()
  form.append("report", content, {
    contentType: "text/plain",
    filename: "report.csv",
    knownLength: content.length,
  })
  try {

    /** @type {import('axios').AxiosResponse<void>} */
    const result = await investmentsApi.post(basePath, form, {
      headers: form.getHeaders(),
    })
    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}
