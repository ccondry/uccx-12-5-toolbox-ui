import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy/src'
import {addUrlQueryParams} from '../../utils'

const state = {
  session: null,
  instances: [],
  instanceName: '',
  verticals: [],
  demoBaseConfig: {},
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
  getDemoBaseConfig ({dispatch, getters}) {
    dispatch('fetchToState', {
      group: 'dcloud',
      type: 'demoBaseConfig',
      url: getters.endpoints.demoBaseConfig,
      options: {
        query: {
          demo: 'uccx',
          version: '12.5v2',
          instant: true
        }
      },
      mutation: types.SET_DEMO_BASE_CONFIG,
      message: 'get demo base config'
    })
  },
  getVerticals ({dispatch, getters}) {
    dispatch('fetchToState', {
      group: 'dcloud',
      type: 'verticals',
      url: getters.endpoints.vertical,
      options: {
        query: {
          all: true,
          summary: true
        }
      },
      mutation: types.SET_VERTICALS,
      message: 'get verticals list'
    })
  },
  async getInstances ({getters, commit, dispatch}) {
    const group = 'dcloud'
    const type = 'instances'
    console.log(`${group} ${type}...`)
    dispatch('setLoading', {group, type, value: true})
    try {
      const url = getters.endpoints.instance
      const options = {
        query: {
          demo: 'uccx',
          version: '12.5v2',
          datacenter: getters.datacenter
        }
      }
      const data = await dispatch('fetch', {url, options})
      console.log('get', group, type, 'success', data)
      commit(types.SET_DCLOUD_INSTANCES, data)
      // get demo base config now
      dispatch('getDemoBaseConfig')
    } catch (e) {
      console.error(`get ${group} ${type} failed: ${e.message}`)
      Toast.open({
        message: `Failed to get dCloud instances: ${e.message}`,
        type: 'is-danger',
        duration: 6 * 1000,
        queue: false
      })
    } finally {
      dispatch('setLoading', {group, type, value: false})
    }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
