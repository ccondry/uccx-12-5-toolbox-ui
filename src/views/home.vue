<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- Fatal Errors -->
    <errors v-if="fatalErrors.length" />

    <!-- Provision -->
    <provision v-if="!isProvisioned && !fatalErrors.length" />

    <!-- VPN -->
    <vpn v-if="isProvisioned" />

    <!-- Workstation -->
    <workstation v-if="isProvisioned" />

    <!-- Agents and Supervisors -->
    <agents v-if="isProvisioned" />

    <!-- Demo Website -->
    <demo-website v-if="isProvisioned" />

    <!-- Mobile App -->
    <mobile-app v-if="isProvisioned" />

    <!-- Whatsapp -->
    <whatsapp v-if="isProvisioned" />

    <!-- Facebook -->
    <facebook v-if="isProvisioned" />

    <!-- CUIC -->
    <cuic v-if="isProvisioned" />

    <!-- Reprovision -->
    <reprovision v-if="isProvisioned" />

    <!-- Copyright and version footer -->
    <app-footer style="margin-bottom: 1rem;" />

    <!-- loading -->
    <b-loading :active="isLoading" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Welcome from '../components/welcome'
import Vpn from '../components/vpn'
import Workstation from '../components/workstation'
import Agents from '../components/agents'
import DemoWebsite from '../components/demo-website'
import MobileApp from '../components/mobile-app'
import Whatsapp from '../components/whatsapp'
import Facebook from '../components/facebook'
import Cuic from '../components/cuic'
import Reprovision from '../components/reprovision'
import Provision from '../components/provision'
import AppFooter from '../components/app-footer'
import Errors from '../components/errors'

export default {
  components: {
    Welcome,
    Vpn,
    Workstation,
    Agents,
    DemoWebsite,
    MobileApp,
    Whatsapp,
    Facebook,
    Cuic,
    Reprovision,
    Provision,
    AppFooter,
    Errors
  },

  data () {
    return {
      password: '',
      dn: '',
      moment
    }
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'jwtUser',
      'loading',
      'working',
      'instance',
      'isProvisioned',
      'isLocked',
      'fatalErrors'
    ]),
    isLoading () {
      return this.loading.app.environment ||
      this.loading.user.provision
    }
  },

  methods: {
    ...mapActions([
    ]),
    clickAdmin () {
      this.$router.push({name: 'Admin'}).catch(e => {})
    },
    clicksetUserPassword () {
      this.$buefy.dialog.prompt({
        title: 'Reset Password',
        message: 'Choose your new password',
        inputAttrs: {
          type: 'password',
          placeholder: 'Your New Password',
          'aria-placeholder': 'Your New Password'
        },
        confirmText: 'Submit',
        rounded: true,
        onConfirm: (password) => {
          this.setUserPassword({
            username: this.jwtUser.sub,
            password
          })
        },
        type: 'is-success'
      })
    }
  }
}
</script>
