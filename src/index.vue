<template>
  <div>
    <!-- top navbar -->
    <navbar />
    <!-- loading -->
    <b-loading :active="!sessionId && isProduction" :is-full-page="true" />
    <!-- main -->
    <div
    v-if="isLoggedIn && sessionId"
    id="main-container"
    class="container is-fluid is-marginless app-content"
    >
      <!-- vue-router container -->
      <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Navbar from './components/navbar'

export default {
  components: {
    Navbar
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isAdmin',
      'jwtUser',
      'sessionId',
      'isProduction'
    ])
  },

  watch: {
    isLoggedIn (val, oldVal) {
      if (val && !oldVal) {
        // user just logged in
      } else if (!val && oldVal) {
        // user just logged out. make them log in again.
        this.login()
      }
    }
  },

  mounted () {
    // try to find and validate user's JWT from localStorage,
    // or start the SSO login process to get one
    this.checkJwt()
    // get the REST API version
    this.getApiVersion()
    // get instances
    this.getInstances()
    // get verticals
    this.getVerticals()
  },

  methods: {
    ...mapActions([
      'checkJwt',
      'getApiVersion',
      'getInstances',
      'getVerticals',
      'login'
    ]),
    clickAdmin () {
      this.$router.push({name: 'Admin'}).catch(e => {})
    },
    clickHome () {
      this.$router.push({name: 'Home'}).catch(e => {})
    }
  }
}
</script>

<style lang="scss">
// hide scroll bar
html, body {
  background-image: url(./assets/images/sign_in_background.jpg);
  // background-position: 0 0;
  background-position: 50%;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

// make container fill viewport
#main-container {
  height: 100vh;
  padding-top: 1rem;
}

// each route content container class - centered
section.main {
  // flex layout
  display: flex;
  // keep small amounts of content vertically centered
  min-height: 100%;
  justify-content: center;
  // center panels horizontally
  align-items: center;
  // put content in a column down the page
  flex-direction: column;
}

section.main > div {
  // padding-bottom: 1rem;
}

// give content panels a grey border and darker box shadow

</style>
