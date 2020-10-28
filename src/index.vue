<template>
  <div>
    <!-- top navbar -->
    <navbar />
    <div
    id="main-container"
    class="container is-fluid is-marginless app-content"
    >
      <section class="main">
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
        <app-footer />
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Navbar from './components/navbar'
import AppFooter from './components/app-footer'
// import Welcome from './components/welcome'

export default {
  components: {
    Navbar,
    AppFooter
    // Welcome
  },

  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isAdmin',
      'jwtUser'
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
  },

  methods: {
    ...mapActions([
      'checkJwt',
      'getApiVersion'
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
  padding-left: 0;
  padding-right: 0;
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
  padding-bottom: 1rem;
}

// give content panels a grey border and darker box shadow
article.box {
  box-shadow: 0 2rem 1rem rgba(0,0,0,.2);
  border: 1px solid rgb(204, 204, 204);
}
</style>
