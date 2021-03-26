const mockGetCompany = jest.fn(()=>[])
const mockListInvestments = jest.fn(()=>[])

const genCsvStrService = require(".")
const companies = require("../../../fake-data/companies")
const investments = require("../../../fake-data/investments")
const {vGenCsvStrService} = require("../../../fake-data/process-result")


jest.mock("../../api/investments-api/investments", ()=>({listInvestments: mockListInvestments}))
jest.mock("../../api/financial-companies-api/companies", ()=>({getCompany: mockGetCompany}))

describe("genCsvStrService", ()=>{
  afterEach(()=>{
    mockGetCompany.mockClear()
    mockListInvestments.mockClear()
  })

  it("should be able to generate a valid CSV string", async ()=>{
    const fakeInvestments = Promise.resolve(investments.valid)
    mockListInvestments.mockReturnValue(fakeInvestments)
    const fakeCompanies = [...companies.vGenCsvStrService]
    mockGetCompany.mockImplementation((id)=>{
      const fakeCompany = Promise.resolve(fakeCompanies.find(c=>c.id === id))
      return fakeCompany
    })

    const result = await genCsvStrService.run()

    expect(mockListInvestments).toBeCalledTimes(1)
    expect(mockGetCompany).toBeCalledTimes(3)
    expect(result).toBe(vGenCsvStrService)
  })

  it("should be able to generate a valid CSV string when there are no investments", async ()=>{
    mockListInvestments.mockReturnValue(Promise.resolve([]))

    const result = await genCsvStrService.run()

    expect(mockListInvestments).toBeCalledTimes(1)
    expect(mockGetCompany).not.toBeCalled()
    expect(result).toBe(["User", "First Name", "Last Name", "Date", "Holding", "Value"].join(",") + "\r\n")
  })
})
