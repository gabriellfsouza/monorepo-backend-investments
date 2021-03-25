const {listInvestments} = require("../../api/investments-api/investments")
const {getCompany} = require("../../api/financial-companies-api/companies")

/**
 * @typedef {import("../../api/financial-companies-api/typedefs").ICompany} ICompany
 * @typedef {import('./typedefs').IRowObj} IRowObj
 */

const genCsvStrService = {
  run: async ()=>{
    const investments = await listInvestments()

    /** @type {String[]} */
    const companiesId = []
      .concat(...investments
        .map(i=>i.holdings
          .map(h=>h.id)))
      .filter((e, i, el)=> i === el
        .indexOf(e))

    /** @type {ICompany[]} */
    const companies = []
      .concat(...await Promise.all(companiesId.map((id)=>
        getCompany(id),
      )))

    /** @type {IRowObj[]} */
    const rowsObj = [].concat(...companies.map(c=>
      investments
        .filter(i=>
          i.holdings.findIndex(h=>h.id === c.id) > -1)
        .map(({holdings, ...h})=>
          ({...h, holding: {...holdings.find(i=>i.id === c.id), name: c.name}}))))

    const rows = rowsObj.map(r=> [
      r.userId,
      r.firstName,
      r.lastName,
      r.date,
      r.holding.name,
      r.investmentTotal * r.holding.investmentPercentage,
    ].join(",") + "\r\n")


    /** @type {String[]} */
    const lines = []
    lines.push(["User", "First Name", "Last Name", "Date", "Holding", "Value"].join(",") + "\r\n")
    lines.push(...rows)
    return lines.join("")
  },
}
module.exports = genCsvStrService
