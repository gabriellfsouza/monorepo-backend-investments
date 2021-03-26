/** @type {import('../typedefs').ICompany[]} */
const companies = require("../data")

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const companiesController = {

  /**
   * @param {Request} _ Request
   * @param {Response} res Response
   */
  index: (_, res) =>{
    res.send(companies)
  },

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  show: (req, res) =>{
    const {id: requestedId} = req.params
    const company = companies.find(({id}) => id === requestedId)
    if (!company) res.status(404).send("Not Found")
    res.send(company)
  },
}

module.exports = companiesController
