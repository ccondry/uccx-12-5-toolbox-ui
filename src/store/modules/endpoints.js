const getters = {
  endpoints: (state, getters) => {
    let urlBase
    let authUrlBase
    const mmUrlBase = 'https://mm.cxdemo.net/api/v1'

    if (getters.isProduction) {
      urlBase = '/api/v1/uccx-12-5'
      authUrlBase = '/api/v1/auth'
    } else {
      // auth API
      // authUrlBase = 'http://localhost:3032/api/v1/auth'
      // production
      authUrlBase = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth'
      // direct to uccx-12-5-toolbox-api
      // urlBase = 'http://localhost:4004/api/v1/uccx-12-5'
      // proxy through toolbox-proxy
      // urlBase = 'http://localhost:3053/api/v1/uccx-12-5'
      // production
      urlBase = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/uccx-12-5'
    }

    return {
      webex: {
        joinSupportRoom: authUrlBase + '/resource/joinUccxSupportRoom',
      },
      version: urlBase + '/version',
      instance: authUrlBase + '/instance',
      vertical: mmUrlBase + '/verticals',
      demoBaseConfig: mmUrlBase + '/demo',
      demoUserConfig: urlBase + '/cumulus',
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