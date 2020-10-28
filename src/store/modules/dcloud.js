import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy/src'

const state = {
  session: null,
  instances: [],
  instanceName: ''
}

const mutations = {
  [types.SET_DCLOUD_SESSION] (state, data) {
    state.session = data
  },
  [types.SET_INSTANCES] (state, data) {
    state.instances = data
  },
  [types.SET_INSTANCE_NAME] (state, data) {
    state.instanceName = data
  }
}

const getters = {
  dcloudSession: state => {
    return state.session || {}
  },
  sessionId: (state, getters) => getters.dcloudSession.sessionId,
  datacenter: (state, getters) => getters.dcloudSession.datacenter,
  brandDemoLink (state, getters) {
    return `https://mm-brand.cxdemo.net?session=${getters.instance.session}&datacenter=${getters.instance.datacenter}&userId=${getters.user.id}`
  },
  cumulusDemoLink (state, getters) {
    return `https://mm.cxdemo.net?session=${getters.instance.session}&datacenter=${getters.instance.datacenter}&userId=${getters.user.id}`
  },
  // all available instances
  instances: state => state.instances,
  // instance name, like RTP-1
  instanceName: state => state.instanceName,
  // full demo instance object
  instance: (state, getters) => {
    try {
      // get datacenter and instance ID
      const parts = getters.instanceName.split('-')
      console.log('parts', parts)
      // find this instance in the array of all availalble PCCE 12 instances
      const obj = getters.instances.find(v => {
        return v.datacenter === parts[0] && String(v.id) === parts[1]
      })
      console.log('instance is', obj)
      return obj || {}
    } catch (e) {
      return {}
    }
  },
  vpnAddress: (state, getters) => {
    try {
      return 'vpn-pcce-12-5-' + getters.datacenter.toLowerCase() + '.cxdemo.net'
    } catch (e) {
      // maybe getters.datacenter is not ready yet
      return 'Loading...'
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
  async getSession ({getters, commit, dispatch}) {
    const group = 'dcloud'
    const type = 'getSession'
    console.log(`${group} ${type}...`)
    dispatch('setLoading', {group, type, value: true})
    try {
      const url = getters.endpoints.session
      const options = {}
      const data = await dispatch('fetch', {url, options})
      console.log('get', group, type, 'success', data)
      commit(types.SET_DCLOUD_SESSION, data)
    } catch (e) {
      console.error(`${group} ${type} failed: ${e.message}`)
      Toast.open({
        message: `Failed to get dCloud session information: ${e.message}`,
        type: 'is-danger',
        duration: 6 * 1000,
        queue: false
      })
    } finally {
      dispatch('setLoading', {group, type, value: false})
    }
  }
  // async getInstances ({getters, commit, dispatch}, showNotification = false) {
  //   console.log('getInstances...')
  //   dispatch('setLoading', {group: 'app', type: 'instances', value: true})
  //   try {
  //     await dispatch('loadToState', {
  //       name: 'pcce 12 instances',
  //       endpoint: getters.endpoints.instances,
  //       query: {
  //         demo: 'pcce',
  //         version: '12.5v1'
  //       },
  //       mutation: types.SET_INSTANCES,
  //       showNotification
  //     })
  //   } catch (e) {
  //     console.error('failed to get instances:', e.message)
  //     throw e
  //   } finally {
  //     dispatch('setLoading', {group: 'app', type: 'instances', value: false})
  //   }
  // },
  // setInstanceName ({commit}, data) {
  //   commit(types.SET_INSTANCE_NAME, data)
  // },
  // updateInstanceName ({getters, dispatch}) {
  //   console.log('updateInstanceName - isProduction =', getters.isProduction)
  //   if (getters.isProduction) {
  //     // get current hostname of the browser location
  //     const hostname = window.location.hostname
  //     console.log('updateInstanceName - hostame =', hostname)
  //     // get the part before ".cisco.com"
  //     const part1 = hostname.split('.').shift()
  //     // get the datacenter part
  //     const datacenter = part1.split('-').pop().toUpperCase()
  //     dispatch('setInstanceName', datacenter + '-1')
  //   } else {
  //     console.log('in development, so using RTP-1 instance.')
  //     dispatch('setInstanceName', 'RTP-1')
  //   }
  // }
}

export default {
  state,
  mutations,
  getters,
  actions
}
