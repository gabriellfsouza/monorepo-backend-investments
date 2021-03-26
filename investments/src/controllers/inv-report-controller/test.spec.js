const supertest = require("supertest")
const {resolve} = require("path")
const {promises} = require("fs")
const app = require("../../app")

describe("invReportController", ()=>{
  describe("store", ()=>{
    it("should be able to store a report file", async ()=>{
      const pathOrigin = resolve(__dirname, "..", "..", "..", "fake-data", "report.csv")
      const pathDestination = resolve(__dirname, "..", "..", "..", "upload")
      const mocked = jest.spyOn(promises, "writeFile").mockImplementationOnce(()=>Promise.resolve())
      const result = await supertest(app).post("/investments/export").expect(204)
        .attach("report", pathOrigin)
      const original = await promises.readFile(pathOrigin)
      expect(mocked).toBeCalledTimes(1)
      expect(result.text).toBe("")
      expect(mocked.mock.calls[0][0].indexOf(pathDestination)).toBeGreaterThan(-1)
      expect(`${mocked.mock.calls[0][1]}`).toBe(`${original}`)
    })

    it("should be able to return an HTTP error message", async ()=>{
      const pathOrigin = resolve(__dirname, "..", "..", "..", "fake-data", "report.csv")
      const pathDestination = resolve(__dirname, "..", "..", "..", "upload")
      const mocked = jest.spyOn(promises, "writeFile").mockImplementationOnce(()=>Promise.reject())
      await supertest(app).post("/investments/export").expect(500)
        .attach("report", pathOrigin)
      const original = await promises.readFile(pathOrigin)
      expect(mocked).toBeCalledTimes(1)
      expect(mocked.mock.calls[0][0].indexOf(pathDestination)).toBeGreaterThan(-1)
      expect(`${mocked.mock.calls[0][1]}`).toBe(`${original}`)
    })
  })
})
