const investmentsApi = require("..")
const {errorHandler} = require("../..")

/** @typedef {import('./typedefs').IInvestment} IInvestment */

const basePath = "investments"

/**
 * Retrieve the entire list of investments
 */
module.exports.listInvestments = async function() {
  try {

    /** @type {import('axios').AxiosResponse<IInvestment[]>} */
    const result = await investmentsApi.get(basePath)

    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}

/**
 * Retrieves a company by its id
 * @param {String} id
 */
module.exports.getInvestment = async function(id) {
  try {

    /** @type {import('axios').AxiosResponse<IInvestment[]>} */
    const result = await investmentsApi.get(`${basePath}/${id}`)
    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}
