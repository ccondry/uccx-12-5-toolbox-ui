const getters = {
  endpoints: (state, getters) => {
    let urlBase
    let authUrlBase
    const mmUrlBase = 'https://mm.cxdemo.net/api/v1'

    if (getters.isProduction) {
      urlBase = '/api/v1/uccx-12-5'
      authUrlBase = '/api/v1/auth'
    } else {
      // direct to uccx-12-5-toolbox-api
      urlBase = 'http://localhost:4004/api/v1/uccx-12-5'
      // proxy through toolbox-proxy
      // urlBase = 'http://localhost:3053/api/v1/uccx-12-5'
      authUrlBase = 'http://localhost:3032/api/v1/auth'
    }

    return {
      webex: {
        joinSupportRoom: authUrlBase + '/resource/joinUccxSupportRoom',
      },
      version: urlBase + '/version',
      instance: authUrlBase + '/instance',
      vertical: mmUrlBase + '/verticals',
      demoConfig: urlBase + '/cumulus',
      demoBaseConfig: mmUrlBase + '/demo',
      provision: urlBase + '/provision',
      password: urlBase + '/password',
      logout: authUrlBase + '/logout'
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