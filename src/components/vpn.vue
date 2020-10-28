<template>
  <div class="is-parent">
    <!-- logged in -->
    <article class="tile is-child is-white flex-container box">
      <p class="title">
        VPN
      </p>

      <div class="content">
        <p>
          Connect your laptop to the demo session using AnyConnect:
        </p>
        <ul>
          <li>
            Address:
            <strong>{{ vpnAddress }}</strong>
            <a @click="clickCopy(vpnAddress, 'VPN Address')">
              <b-icon icon="layers" />
            </a>
          </li>
          <li>
            Username:
            <strong>{{ jwtUser.username }}</strong>
            <a @click="clickCopy(jwtUser.username, 'VPN Username')">
              <b-icon icon="layers" />
            </a>
          </li>
          <li>
            Password:
            <strong>Your chosen demo password</strong>
            <b-button
            style="margin-left: 1rem;"
            size="is-small"
            type="is-primary"
            rounded
            @click="clickResetPassword"
            >
              Reset Password
            </b-button>
          </li>
        </ul>
        <small>
          Note: If you have any issues resolving DNS in the demo while using
          Windows, try rebooting Windows to resolve this issue.
        </small>
      </div>
    </article>
  </div>
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
        title: 'Reset Password',
        message: `Enter your new password:`,
        type: 'is-success',
        confirmText: 'Submit',
        onConfirm: (password) => {
          console.log('changing password...')
        }
      })
    },
    clickCopy (string, type) {
      this.copyToClipboard({string, type})
    }
  }
}
</script>