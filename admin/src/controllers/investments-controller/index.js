const {getInvestment} = require("../../api/investments-api/investments")

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */


const investmentsController = {

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  async show(req, res) {

    /** @type {{id:String}} */
    const {id} = req.params
    try {
      const investments = await getInvestment(id)
      return res.send(investments)
    } catch (error) {
      console.error(error)
      return res.send(500)
    }
  },
}

module.exports = investmentsController
