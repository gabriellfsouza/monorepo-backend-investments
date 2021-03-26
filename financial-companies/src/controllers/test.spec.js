const supertest = require("supertest")
const app = require("../app")

/** @type {import('../typedefs').ICompany[]} */
const companies = require("../data")

describe("companiesController", ()=>{
  describe("show", ()=>{
    it("should be able to return a company", async ()=>{
      const [company] = companies
      const result = await supertest(app).get(`/companies/${company.id}`).expect(200)
      expect(result.body).toMatchObject(company)
    })

    it("should return a HTTP not found message when the id was not found", async ()=>{

      const result = await supertest(app).get("/companies/not-a-valid-id").expect(404)
      expect(result.text).toBe("Not Found")
    })
  })

  describe("index", ()=>{
    it("should be able to return all companies", async ()=>{
      const result = await supertest(app).get("/companies")
      expect(result.body).toMatchObject(companies)
    })
  })
})
