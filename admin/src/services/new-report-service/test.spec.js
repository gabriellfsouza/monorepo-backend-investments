const mockCsvStrServiceRun = jest.fn(()=>{})
const mockExportReport = jest.fn(()=>{})

const newReportService = require(".")

jest.mock("../gen-csv-str-service", ()=> ({run: mockCsvStrServiceRun}))
jest.mock("../../api/investments-api/investments/export", ()=> ({exportReport: mockExportReport}))

describe("newReportService", ()=>{
  beforeEach(()=>{
    mockCsvStrServiceRun.mockClear()
    mockExportReport.mockClear()
  })

  it("should be able to redirect the string data from the genCsvStrService to export function", async ()=>{
    const fakeString = "string-to-be-returned"
    mockCsvStrServiceRun.mockReturnValue(Promise.resolve(fakeString))
    mockExportReport.mockReturnValue(Promise.resolve())

    await newReportService.run()

    expect(mockCsvStrServiceRun).toBeCalledTimes(1)
    expect(mockExportReport).toBeCalledWith(fakeString)
  })
})
