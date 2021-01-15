<template>
  <panel title="VPN" aria-id="vpn">
    <p>
      Connect your laptop to the demo session using AnyConnect:
    </p>
    <ul>
      <li>
        Address:
        <strong>{{ vpnAddress }}</strong>
        <copy :value="vpnAddress" name="VPN Address" />
      </li>
      <li>
        Username:
        <strong>{{ jwtUser.username }}</strong>
        <copy :value="jwtUser.username" name="VPN Username" />
      </li>
      <li>
        Password:
        <strong>Your chosen demo VPN password</strong>
      </li>
    </ul>
    <b-field>
      <b-button
      style="margin-left: 1rem;"
      type="is-primary"
      rounded
      @click="clickResetPassword"
      >
        Reset VPN Password
      </b-button>
    </b-field>
    <p>
      Note: If you have any issues resolving DNS in the demo while using
      Windows, try rebooting Windows to resolve this issue.
    </p>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'vpnAddress',
      'jwtUser'
    ])
  },

  methods: {
    ...mapActions([
      'resetPassword',
      'copyToClipboard'
    ]),
    clickResetPassword () {
      this.$buefy.dialog.prompt({
        title: 'Reset Demo VPN Password',
        message: `Enter your new demo VPN password:`,
        type: 'is-success',
        confirmText: 'Submit',
        rounded: true,
        inputAttrs: {
          type: 'password'
        },
        onConfirm: (password) => {
          console.log('changing password...')
          this.resetPassword(password)
        }
      })
    },
    clickCopy (string, type) {
      this.copyToClipboard({string, type})
    }
  }
}
</script>