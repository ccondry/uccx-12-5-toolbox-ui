<template>
  <panel title="Provision" aria-id="provision">
    <!-- provisioning is not enabled for this instance -->
    <div v-if="isLocked">
      <p>
        Provisioning is disabled for this demo instance. Please try using
        another dCloud datacenter or a newer version of this demo (if one is
        available).
      </p>
    </div>

    <!-- provision is enabled and not started yet -->
    <div v-if="!isLocked && !provisionStatus && !provisionStarted">
      <p>
        Would you like to provision your account?
      </p>
      <b-field v-if="!isLocked && !provisionStatus">
        <b-button
        :disabled="working.user.provision"
        type="is-success"
        rounded
        expanded
        @click.prevent="clickProvision"
        >
          {{ buttonText }}
        </b-button>
      </b-field>
    </div>

    <!-- provision in progress -->
    <div v-if="provisionStarted || provisionStatus === 'working'">
      <p>
        Your account is being provisioned. It may take up to 20 minutes for it to
        complete.
      </p>
      <p>
        This page will automatically change when your account is ready to use.
      </p>
    <div>
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
      'sessionId',
      'isLocked',
      'provisionStatus',
      'provisionStarted'
    ]),
    buttonText () {
      if (this.working.user.provision) {
        return `Working - ${this.provisionTime}`       
      } else {
        return 'Provision Me'
      }
    }
  },

  methods: {
    ...mapActions([
      'provisionUser'
    ]),
    clickProvision () {
      console.log('user clicked Provision Me button')
      this.$buefy.dialog.prompt({
        title: 'Provision',
        message: `Please choose a password for your VPN account:`,
        inputAttrs: {
          placeholder: 'Your new VPN password',
          type: 'password'
        },
        rounded: true,
        confirmText: 'Submit',
        type: 'is-success',
        onConfirm: password => {
          this.provisionUser(password)
          // first provision
        }
      })
    }
  }
}
</script>