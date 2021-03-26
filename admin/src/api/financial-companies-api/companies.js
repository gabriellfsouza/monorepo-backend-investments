const fCompaniesApi = require(".")
const {errorHandler} = require("..")

/** @typedef {import('./typedefs').ICompany} ICompany */

const basePath = "companies"

/**
 * Retrieves a company by its id
 * @param {*} id
 * @returns
 */
module.exports.getCompany = async function(id) {
  try {

    /** @type {import('axios').AxiosResponse<ICompany[]>} */
    const result = await fCompaniesApi.get(`${basePath}/${id}`)
    return result.data
  } catch (error) {
    throw new Error(errorHandler(error))
  }
}
