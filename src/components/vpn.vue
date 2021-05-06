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
        <strong>{{ jwtUser.vpnUsername }}</strong>
        <copy :value="jwtUser.vpnUsername" name="VPN Username" />
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
    <p>
      You can download the AnyConnect installer here:
    </p>
    <ul>
      <li>
        <a :href="links.windows" download>AnyConnect 4.10 for Windows</a>
        (Only the <strong>Core &amp; VPN</strong> component is necessary)
      </li>
      <li>
        <a :href="links.mac" download>AnyConnect 4.10 for Mac</a>
      </li>
    </ul>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      links: {
        windows: 'https://mm-static.cxdemo.net/anyconnect-win-4.10.00093-predeploy-k9.zip',
        mac: 'https://mm-static.cxdemo.net/anyconnect-macos-4.10.00093-predeploy-k9.dmg'
      }
    }
  },

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