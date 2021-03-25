const axios = require("axios")
const config = require("config")

const fCompaniesApi = axios.default.create({baseURL: config.fCompaniesServiceUrl})

module.exports = fCompaniesApi
