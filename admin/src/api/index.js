module.exports.errorHandler = function(error) {
  if (error.response) {

    /** @type {import('axios').AxiosError<string>} */
    const axiosErr = error
    throw new Error(axiosErr.response.data)
  }
  throw error
}
