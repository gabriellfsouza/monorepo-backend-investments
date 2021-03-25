const axios = require("axios")
const config = require("config")

const investmentApi = axios.default.create({baseURL: config.investmentsServiceUrl})

module.exports = investmentApi
