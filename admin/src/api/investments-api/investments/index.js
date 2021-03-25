const investmentsApi = require("..")
const {errorHandler} = require("../..")

/** @typedef {import('./typedefs').IInvestment} IInvestment */

const basePath = "investments"


module.exports.listInvestments = async function() {
  try {

    /** @type {import('axios').AxiosResponse<IInvestment[]>} */
    const result = await investmentsApi.get(basePath)

    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}

module.exports.getInvestment = async function(id) {
  try {

    /** @type {import('axios').AxiosResponse<IInvestment[]>} */
    const result = await investmentsApi.get(`${basePath}/${id}`)
    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}
