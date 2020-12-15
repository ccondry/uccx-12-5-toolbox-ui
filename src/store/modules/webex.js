import {ToastProgrammatic as Toast} from 'buefy/src'

const actions = {
  async joinSupportRoom ({dispatch, getters}, personEmail) {
    const response = await dispatch('fetch', {
      group: 'webex',
      type: 'joinSupportRoom',
      url: getters.endpoints.webex.joinSupportRoom,
      options: {
        method: 'POST',
        body: {personEmail}
      }
    })
    if (response instanceof Error) {
      if (response.status === 409) {
        Toast.open({
          type: 'is-success',
          message: `You are aleady in the support space.`
        })
      } else {
        Toast.open({
          type: 'is-danger',
          message: `Failed to add you to the support space: ${response.message}`,
          queue: false
        })
      }
    } else {
      Toast.open({
        type: 'is-success',
        message: `You have been added to the support space.`
      })
    }
  }
}

module.exports = {
  actions
}