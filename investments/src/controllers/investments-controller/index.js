const R = require("ramda")
const investments = require("../../data")

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

const investmentsController = {

  /**
   * @param {Request} req Request
   * @param {Response} res Response
   */
  show: (req, res)=>{

    /** @type {{id:String}} */
    const {id} = req.params
    const investment = R.filter(R.propEq("id", id), investments)
    res.send(investment)
  },

  /**
   * @param {Request} _ Request
   * @param {Response} res Response
   */
  index: (_, res)=>{
    res.send(investments)
  },
}

module.exports = investmentsController
