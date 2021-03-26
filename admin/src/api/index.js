module.exports.errorHandler = function(error) {
  if (error.response) {

    /** @type {import('axios').AxiosError<string>} */
    const axiosErr = error
    return axiosErr.response.data
  }
  return error
}
