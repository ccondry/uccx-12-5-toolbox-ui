<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- Fatal Errors -->
    <errors v-if="fatalErrors.length" />

    <!-- Loading -->
    <loading v-if="isLoading" />

    <!-- Provision -->
    <provision v-if="showProvision" />

    <!-- Demo Website -->
    <demo-website v-if="isProvisioned" />

    <!-- VPN -->
    <vpn v-if="isProvisioned" />

    <!-- Workstation -->
    <workstation v-if="isProvisioned" />

    <!-- Agents and Supervisors -->
    <agents v-if="isProvisioned" />

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
import Loading from '../components/loading'

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
    Errors,
    Loading
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
      'fatalErrors',
      'provisionStatus',
      'provisionStarted'
    ]),
    isLoading () {
      return this.loading.app.environment ||
      (this.loading.user.provision && this.provisionStatus !== 'working')
    },
    showProvision () {
      // hide if provision complete
      if (this.isProvisioned) {
        return false
      }
      
      // show if there are fatal errors
      if (this.fatalErrors.length) {
        return true
      }

      // show if provision status has been loaded and it's not complete
      if (!this.loading.user.provision && !this.isProvisioned) {
        return true
      }

      // else hide
      return false
    }
  },

  methods: {
    ...mapActions([
    ]),
    clickAdmin () {
      this.$router.push({name: 'Admin'}).catch(e => {})
    }
  }
}
</script>
