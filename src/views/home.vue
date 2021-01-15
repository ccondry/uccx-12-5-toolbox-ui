<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- Fatal Errors -->
    <errors v-if="fatalErrors.length" />

    <!-- Provision -->
    <provision v-if="!loading.user.provision && !isProvisioned && !fatalErrors.length" />

    <!-- Loading -->
    <loading v-if="isLoading" />

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
      'provisionStatus'
    ]),
    isLoading () {
      return this.loading.app.environment ||
      (this.loading.user.provision && this.provisionStatus !== 'working')
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
