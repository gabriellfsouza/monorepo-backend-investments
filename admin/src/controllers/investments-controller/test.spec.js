const mockAxiosResponse = jest.fn()

const supertest = require("supertest")
const {default: MockAdapter} = require("axios-mock-adapter")
const app = require("../../app")
const investmentsApi = require("../../api/investments-api")
const investments = require("../../../fake-data/investments")

const axiosMock = new MockAdapter(investmentsApi, {delayResponse: 100})

describe("investmentsController", ()=>{

  /** @type {jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>} */
  let trace
  beforeAll(()=>{
    trace = jest.spyOn(console, "trace").mockImplementation(()=>{})
  })

  afterAll(()=>{
    trace.mockClear()
  })

  describe("show", ()=>{
    beforeEach(()=>{
      axiosMock.reset()
    })

    it("should be able to retrieve an investment", async ()=>{
      const fakeData = [investments.valid[1]]
      axiosMock.onGet(`/investments/${1}`).reply(mockAxiosResponse)
      mockAxiosResponse.mockImplementation(()=>[200, fakeData])

      const response = await supertest(app).get("/investments/1").expect(200)
      expect(response.body).toMatchObject(fakeData)
      expect(mockAxiosResponse).toBeCalled()
    })

    it("should be able to return an error message when something goes wrong", async ()=>{
      axiosMock.onGet("/investments/1").reply(500, "Internal Server Error")
      const result = await supertest(app).get("/investments/1").expect(500)
      await expect(result).toHaveProperty("text", "Internal Server Error")
    })

  })

})
