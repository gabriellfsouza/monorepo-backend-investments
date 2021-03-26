const mockInvApiRequest = jest.fn()
const mockFinCompApiRequest = jest.fn()

const supertest = require("supertest")

const {default: MockAdapter} = require("axios-mock-adapter")

const financialCompaniesApi = require("../../api/financial-companies-api")
const investmentsApi = require("../../api/investments-api")
const app = require("../../app")
const investments = require("../../../fake-data/investments")
const companies = require("../../../fake-data/companies")
const processResult = require("../../../fake-data/process-result")

const companiesMock = new MockAdapter(financialCompaniesApi)
const investmentsMock = new MockAdapter(investmentsApi)

/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */

describe("reportController", ()=>{

  /** @type {jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>} */
  let trace
  beforeAll(()=>{
    trace = jest.spyOn(console, "trace").mockImplementation(()=>{})
  })

  afterAll(()=>{
    trace.mockClear()
  })

  beforeEach(()=>{
    companiesMock.reset()
    investmentsMock.reset()
  })

  describe("show", ()=>{
    it("should be able to generate and download a csv file containing the report", async ()=>{
      investmentsMock.onGet("/investments").reply(200, investments.valid)
      companies.vGenCsvStrService.forEach(company=>
        companiesMock.onGet(`/companies/${company.id}`).reply(200, company),
      )
      const result = await supertest(app).get("/investments/report")
        .expect(200)
        .expect("content-type", "text/csv; charset=utf-8")
        .expect("content-disposition", "attachment; filename=\"report.csv\"")

      expect(result.text).toBe(processResult.vGenCsvStrService)
    })

    it("should be able to return an error message when the investments service is \"broken\"", async ()=>{
      investmentsMock.onGet("/investments").reply(500, "Internal Server Error")
      const result = await supertest(app).get("/investments/report").expect(500)
      await expect(result).toHaveProperty("text", "Internal Server Error")
    })

  })

  describe("store", ()=>{

    beforeEach(()=>{
      mockInvApiRequest.mockClear()
      mockFinCompApiRequest.mockClear()
    })

    it("should be able to upload a new report into the investments service", async ()=>{
      mockInvApiRequest.mockImplementation(()=> [204])

      investmentsMock.onGet("/investments").reply(200, investments.valid)
      companies.vGenCsvStrService.forEach(company=>
        companiesMock.onGet(`/companies/${company.id}`).reply(200, company),
      )
      investmentsMock.onPost("investments/export").reply((config)=>mockInvApiRequest({
        method: config.method,
        data: config.data._streams[1],
      }))
      const result = await supertest(app).post("/investments/report")
        .expect(204)
      expect(result.text).toBe("")
      expect(mockInvApiRequest).toHaveBeenCalledWith({method: "post", data: processResult.vGenCsvStrService})
    })

    it("should be able to return an error message when the investments service is \"broken\"", async ()=>{
      investmentsMock.onGet("/investments").reply(500, "Internal Server Error")
      const result = await supertest(app).post("/investments/report").expect(500)
      await expect(result).toHaveProperty("text", "Internal Server Error")
    })
    it("should be able to return an error message when the companies service is \"broken\"", async ()=>{
      investmentsMock.onGet("/investments").reply(200, investments.valid)
      companies.vGenCsvStrService.forEach(company=>
        companiesMock.onGet(`/companies/${company.id}`).reply(500, "Internal Server Error"),
      )

      const result = await supertest(app).post("/investments/report").expect(500)
      await expect(result).toHaveProperty("text", "Internal Server Error")
    })

    it("should be able to return an error message when the upload method is \"broken\"", async ()=>{
      investmentsMock.onGet("/investments").reply(200, investments.valid)
      companies.vGenCsvStrService.forEach(company=>
        companiesMock.onGet(`/companies/${company.id}`).reply(200, company),
      )
      investmentsMock.onPost("investments/export").reply(500, "Internal Server Error")

      const result = await supertest(app).post("/investments/report").expect(500)
      await expect(result).toHaveProperty("text", "Internal Server Error")
    })
  })

})
