import {
  DialogProgrammatic as Dialog,
  ToastProgrammatic as Toast
} from 'buefy/src'

import * as types from '../mutation-types'

// parse a JWT payload into a JSON object
function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

const state = {
  jwt: null,
  provision: {},
  provisionStarted: false
}

const mutations = {
  [types.SET_JWT] (state, data) {
    state.jwt = data
  },
  [types.SET_PROVISION] (state, data) {
    state.provision = data
  },
  [types.SET_PROVISION_STARTED] (state, data) {
    state.provisionStarted = data
  }
}

const getters = {
  provision: state => state.provision,
  provisionStarted: state => state.provisionStarted,
  isAdminSu: (state, getters) => {
    try {
      return getters.jwtUser.suJwt
    } catch (e) {
      return false
    }
  },
  isAdmin: (state, getters) => {
    try {
      return getters.jwtUser.admin
    } catch (e) {
      return false
    }
  },
  jwt: state => state.jwt,
  isLoggedIn: (state, getters) => {
    try {
      return getters.jwtUser.email.length > 0
    } catch (e) {
      return false
    }
  },
  jwtUser: state => {
    try {
      return parseJwt(state.jwt)
    } catch (e) {
      return {}
    }
  },
  isProvisioned: (state, getters) => {
    try {
      return getters.provision.status === 'complete'
    } catch (e) {
      return false
    }
  },
  provisionStatus: (state, getters) => {
    try {
      return getters.provision.status
    } catch (e) {
      return null
    }
  }
}

const actions = {
  async logout ({dispatch, commit, getters}) {
    try {
      const response = await dispatch('fetch', {
        group: 'user',
        type: 'logout',
        url: getters.endpoints.logout,
        options: {
          method: 'POST'
        },
        message: 'logout'
      })
      // did we get a new JWT (from logging out of switch-user)?
      if (response.jwt) {
        // save new JWT
        dispatch('setJwt', response.jwt)
      } else {
        // make user log in again
        dispatch('login')
      }
    } catch (e) {
      console.log(e)
    }
  },
  resetPassword ({dispatch, getters}, password) {
    dispatch('fetch', {
      group: 'user',
      type: 'password',
      url: getters.endpoints.password,
      options: {
        method: 'POST',
        body: {
          password
        }
      },
      message: 'reset password'
    })
  },
  async provisionUser ({commit, dispatch, getters}, password) {
    console.log('user.provisionUser action...')
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'provision',
      url: getters.endpoints.provision,
      options: {
        method: 'POST',
        body: {
          password
        }
      },
      message: 'provision user'
    })
    console.log(response)
    if (response instanceof Error) {
      // error
      Toast.open({
        message: `Failed to provision your account: ${response.message}`,
        type: 'is-danger',
        duration: 12 * 1000,
        queue: false
      })
    } else {
      // success
      Toast.open({
        message: `Successfully started provisioning your user account. Please allow up to 20 minutes for provision to complete.`,
        type: 'is-success',
        duration: 10 * 1000,
        queue: true
      })
      // mark started provision
      commit(types.SET_PROVISION_STARTED, true)
      // update provision info in 10 seconds
      setTimeout(() => dispatch('getProvision'), 20 * 1000)
    }
  },
  async getProvision ({dispatch, getters}) {
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'provision',
      url: getters.endpoints.provision,
      message: 'get provision information',
      mutation: types.SET_PROVISION
    })
    if (response instanceof Error) {
      // error
      Toast.open({
        message: `Failed to get your account provision information: ${response.message}`,
        type: 'is-danger',
        duration: 12 * 1000,
        queue: false
      })
    } else {
      // success
      // is it still working?
      if (response.status === 'working') {
        // check again in 20 seconds
        setTimeout(() => dispatch('getProvision'), 20 * 1000)
      }
    }
  },
  setJwt ({commit, dispatch}, jwt) {
    try {
      // test parse JWT to user JSON
      parseJwt(jwt)
      // put JWT in state
      commit(types.SET_JWT, jwt)
      // put JWT in localStorage
      window.localStorage.setItem('jwt', jwt)
      // get provision info for this user
      dispatch('getProvision')
      // and get user's vertical selection
      dispatch('getDemoUserConfig')
    } catch (e) {
      // parseJwt failed - delete this invalid JWT
      dispatch('unsetJwt')
    }
  },
  unsetJwt ({commit}) {
    // remove JWT from state
    commit(types.SET_JWT, null)
    // remove JWT from localStorage
    window.localStorage.removeItem('jwt')
  },
  login ({dispatch, getters}) {
    if (getters.isProduction) {
      // production - forward to auth page for SSO
      window.location = '/auth'
    } else {
      // development - prompt for JWT
      Dialog.prompt({
        title: 'Log In',
        message: `Enter your JWT:`,
        onConfirm: (jwt) => {
          dispatch('setJwt', jwt)
        },
        canCancel: false,
        inputAttrs: {
          type: 'textarea'
        },
        confirmText: 'Log In',
        type: 'is-success',
        rounded: true
      })
    }
  },
  async checkJwt ({dispatch, getters}) {
    dispatch('setWorking', {group: 'user', type: 'login', value: true})
    // check jwt in browser local storage
    const jwt = window.localStorage.getItem('jwt')
    // if we found a token, check the web service to see if it's still valid
    if (jwt !== null && jwt.length > 40) {
      console.log('found existing JWT in localStorage')
      // store JWT in state
      dispatch('setJwt', jwt)
    } else {
      // no JWT found - make the user log in
      dispatch('login')
    }
  }
}

export default {
  actions,
  state,
  getters,
  mutations
}