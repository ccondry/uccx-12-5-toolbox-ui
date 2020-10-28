const getters = {
  endpoints: (state, getters) => {
    const urlBase = getters.isProduction ? '/api/v1/uccx-12-5' : 'http://localhost:4004/api/v1/uccx-12-5'
    const authUrlBase = getters.isProduction ? '/api/v1/auth' : 'http://localhost:3032/api/v1/auth'
    return {
      webex: {
        joinSupportRoom: authUrlBase + '/resource/joinUccxSupportRoom',
      },
      version: urlBase + '/version',
      session: urlBase + '/session'
    }
  },
  defaultRestOptions: (state, getters) => {
    return {
      headers: {
        Authorization: 'Bearer ' + getters.jwt
      }
    }
  }
}

export default {
  getters
}