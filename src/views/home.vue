<template>
  <section class="main">
    <!-- welcome -->
    <welcome />

    <!-- VPN -->
    <vpn />

    <!-- Workstation -->
    <workstation />

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

export default {
  components: {
    Welcome,
    Vpn,
    Workstation
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
      'working'
    ]),
    isLoading () {
      return this.loading.app.environment
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
