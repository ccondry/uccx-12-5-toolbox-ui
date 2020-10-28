import {ToastProgrammatic as Toast} from 'buefy/src'

const actions = {
  async joinSupportRoom ({dispatch, getters}, data) {
    const group = 'webex'
    const type = 'joinSupportRoom'
    console.log(`${group}.${type} started: ${data}`)
    dispatch('setWorking', {group, type, value: true})
    try {
      const url = getters.endpoints[group][type]
      const options = {
        method: 'POST',
        body: {personEmail: email}
      }
      await dispatch('fetch', {url, options})
      Toast.open({
        type: 'is-success',
        message: `You have been added to the support space`
      })
    } catch (e) {
      console.log(`${group}.${type} failed: ${e.message}`)
      Toast.open({
        type: 'is-danger',
        message: `Failed to add you to the support space: ${e.message}`,
        queue: false
      })
    } finally {
      dispatch('setWorking', {group, type, value: false})
    }
  }
}

module.exports = {
  actions
}