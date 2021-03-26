const investments = require("./investments")

module.exports.valid = [{
  "id": "1",
  "name": "The Big Investment Company",
  "address": "14 Square Place",
  "postcode": "SW18UU",
  "frn": "234165",
}, {
  "id": "2",
  "name": "The Small Investment Company",
  "address": "12 Circle Square",
  "postcode": "SW18UD",
  "frn": "773388",
}, {
  "id": "3",
  "name": "Capital Investments",
  "address": "1 Capital Road",
  "postcode": "SW18UT",
  "frn": "078592",
}]

module.exports.vGenCsvStrService = module.exports.valid
  .filter(e=> investments.valid.find(i=>i.holdings.find(h=>h.id === e.id)))
