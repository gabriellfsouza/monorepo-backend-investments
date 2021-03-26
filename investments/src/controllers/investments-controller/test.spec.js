
const supertest = require("supertest")
const app = require("../../app")

/** @type {import('../../typedefs').IInvestment[]} */
const investments = require("../../data")

describe("investmentsController", ()=>{
  describe("show", ()=>{

    it("should be able to return an investment", async ()=>{
      const [investment] = investments
      const result = await supertest(app).get(`/investments/${investment.id}`).expect(200)
      expect(result.body).toMatchObject([investment])
    })

    it("should return an empty array when the id was not found", async ()=>{
      const result = await supertest(app).get("/investments/not-a-valid-id").expect(200)
      expect(result.body).toMatchObject([])
    })

  })
  describe("index", ()=>{
    it("should be able to return all investments", async ()=>{
      const result = await supertest(app).get("/investments").expect(200)
      expect(result.body).toMatchObject(investments)
    })
  })
})
