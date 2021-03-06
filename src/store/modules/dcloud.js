import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy/src'
import {addUrlQueryParams} from '../../utils'

const state = {
  session: null,
  instances: [],
  instanceName: '',
  verticals: [],
  demoBaseConfig: {},
  demoUserConfig: {},
  datacenterNames: {
    'RTP': 'US East',
    'SJC': 'US West',
    'LON': 'EMEAR',
    'SNG': 'APJ'
  }
}

const mutations = {
  [types.SET_DCLOUD_SESSION] (state, data) {
    state.session = data
  },
  [types.SET_DCLOUD_INSTANCES] (state, data) {
    state.instances = data
  },
  [types.SET_INSTANCE_NAME] (state, data) {
    state.instanceName = data
  },
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_BASE_CONFIG] (state, data) {
    state.demoBaseConfig = data[0]
  },
  [types.SET_DEMO_USER_CONFIG] (state, data) {
    state.demoUserConfig = data
  }
}

const getters = {
  isLocked: (state, getters) => {
    return getters.instance.locked === true
    // return true
  },
  datacenterDisplayName: (state, getters) => {
    return state.datacenterNames[getters.datacenter]
  },
  verticals: state => state.verticals,
  sessionId: (state, getters) => getters.instance.session,
  datacenter: (state, getters) => {
    if (getters.isProduction) {
      // get current hostname of the browser location
      const hostname = window.location.hostname
      // get the part before ".cisco.com"
      const part1 = hostname.split('.').shift()
      // get the datacenter part
      return part1.split('-').pop().toUpperCase()
    } else {
      // development
      return 'RTP'
      // return 'LON'
    }
  },
  brandDemoLink (state, getters) {
    return addUrlQueryParams('https://mm-brand.cxdemo.net', {
      session: getters.instance.session,
      datacenter: getters.instance.datacenter,
      userId: getters.jwtUser.id
    })
  },
  cumulusDemoLink (state, getters) {
    return addUrlQueryParams('https://mm.cxdemo.net', {
      session: getters.instance.session,
      datacenter: getters.instance.datacenter,
      userId: getters.jwtUser.id
    })
  },
  // all available instances
  instances: state => state.instances,
  // instance name, like RTP-1
  instanceName: (state, getters) => {
    return getters.datacenter + '-1'
  },
  // full demo instance object
  instance: (state, getters) => {
    try {
      return getters.instances[0] || {}
    } catch (e) {
      return {}
    }
  },
  demoBaseConfig: state => state.demoBaseConfig,
  demoUserConfig: state => state.demoUserConfig,
  vpnAddress: (state, getters) => {
    const address = getters.demoBaseConfig.vpn
    if (!address) {
      return 'Loading...'
    } else {
      return getters.demoBaseConfig.vpn.replace(/\${datacenter}/, getters.datacenter.toLowerCase())
    }
  },
  rdpAddress: (state, getters) => {
    return `${getters.rdpFqdn} (${getters.rdpIp})`
  },
  rdpIp: (state, getters) => {
    return '198.18.134.210'
  },
  rdpFqdn: (state, getters) => {
    return 'rdp.dcloud.cisco.com'
  }
}

const actions = {
  saveDemoUserConfig ({dispatch, getters}, body) {
    dispatch('fetch', {
      group: 'user',
      type: 'demoUserConfig',
      url: getters.endpoints.demoUserConfig,
      options: {
        method: 'POST',
        body
      },
      message: 'save demo user configuration'
    })
  },
  async getDemoUserConfig ({commit, dispatch, getters}) {
    const response = await dispatch('fetch', {
      group: 'dcloud',
      type: 'demoUserConfig',
      url: getters.endpoints.demoUserConfig,
      mutation: types.SET_DEMO_USER_CONFIG,
      message: 'get demo user configuration'
    })
    if (response instanceof Error) {
      // error
      Toast.open({
        message: `Failed to get your vertical selection: ${response.message}`,
        type: 'is-danger',
        duration: 12 * 1000,
        queue: false
      })
      if (response.status === 404) {
        // this is a fatal error, so put it in state to be displayed
        commit(types.ADD_FATAL_ERROR, 'Could not connect to instant demo session.')
      }
    } else {
      // success
    }
  },
  async getDemoBaseConfig ({dispatch, getters}) {
    const query = {
      demo: 'uccx',
      version: '12.5v2',
      instant: true
    }
    const response = await dispatch('fetch', {
      group: 'dcloud',
      type: 'demoBaseConfig',
      url: getters.endpoints.demoBaseConfig,
      options: {
        query
      },
      mutation: types.SET_DEMO_BASE_CONFIG,
      message: 'get demo base config'
    })
    if (response instanceof Error && response.status === 404) {
      // this is a fatal error, so put it in state to be displayed
      commit(types.ADD_FATAL_ERROR, 'Could not connect to the Demo Toolbox service.')
    } else if (Array.isArray(response) && response.length === 0) {
      // empty results
      // this is a fatal error, so put it in state to be displayed
      commit(types.ADD_FATAL_ERROR, `Could not find any matching instant demo definitions for ${query.demo} ${query.version}.`)
    }
  },
  getVerticals ({dispatch, getters}) {
    dispatch('fetch', {
      group: 'dcloud',
      type: 'verticals',
      url: getters.endpoints.vertical,
      options: {
        query: {
          owner: getters.jwtUser.username,
          summary: true
        }
      },
      mutation: types.SET_VERTICALS,
      message: 'get verticals list'
    })
  },
  async getInstances ({getters, commit, dispatch}) {
    const response = await dispatch('fetch', {
      group: 'dcloud',
      type: 'instances',
      url: getters.endpoints.instance,
      options: {
        query: {
          demo: 'uccx',
          version: '12.5v2',
          datacenter: getters.datacenter
        }
      },
      mutation: types.SET_DCLOUD_INSTANCES,
      message: 'get instant demo instances list'
    })
    if (response instanceof Error && response.status === 404) {
      // 404 response
      // this is a fatal error, so put it in state to be displayed
      commit(types.ADD_FATAL_ERROR, 'Could not connect to the Demo Toolbox service.')
    } else if (Array.isArray(response) && response.length === 0) {
      // 200 response with empty results
      // this is a fatal error, so put it in state to be displayed
      commit(types.ADD_FATAL_ERROR, `Could not find any active "UCCX 12.5v2" instant demo sessions in the "${getters.datacenter}" datacenter.`)
    } else {
      // success
      // get demo base config now
      dispatch('getDemoBaseConfig')
    }

    
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
