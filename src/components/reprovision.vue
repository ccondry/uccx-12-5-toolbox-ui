<template>
  <panel title="Reprovision" aria-id="reprovision">
    <p>
      Your account is already provisioned for this demo, but you can run it
      again if you need to.
    </p>
    <p>
      Would you like to provision again anyway?
    </p>
    <div class="buttons" style="justify-content: space-around;">
      <b-button
      :disabled="working.user.provision"
      type="is-success"
      rounded
      @click.prevent="clickProvision"
      >
        {{ buttonText }}
      </b-button>
    </div>
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      timerEnd: 0,
      timerNow: 0
    }
  },

  computed: {
    ...mapGetters([
      'jwtUser',
      'working',
      'sessionId'
    ]),
    buttonText () {
      if (this.working.user.provision) {
        return `Working - ${provisionTime}`       
      } else {
        return 'Yes, Provision Me Anyway'
      }
    }
  },

  methods: {
    ...mapActions([
      'provisionUser'
    ]),
    startTimer () {
      // advance the timer every 1 second
      setInterval(() => {
        this.timerNow = new Date().getTime()
      }, 1000)
    },
    clickProvision () {
      console.log('user clicked Reprovision button')
      this.$buefy.dialog.prompt({
        title: 'Provision',
        message: `Please choose a password for your VPN account. <br>Do not reuse your Cisco account password.`,
        inputAttrs: {
          placeholder: 'Your new (or current) VPN password',
          type: 'password'
        },
        rounded: true,
        confirmText: 'Submit',
        type: 'is-success',
        onConfirm: (password) => {
          this.provisionUser(password)
          // not first provision
          // set timer for working estimate to 45 seconds
          this.timerEnd = new Date().getTime() + 45 * 1000
          this.startTimer()
        }
      })
    }
  }
}
</script>