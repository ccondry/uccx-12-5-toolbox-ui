<template>
  <b-navbar
  :transparent="true"
  :fixed-top="true"
  >
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <cisco-logo
        style="color: blue; width: 3rem; height: 3rem;"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Documentation
      </b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
          v-if="isAdmin"
          type="is-info"
          rounded
          >
            Log Out
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import CiscoLogo from './cisco-logo'

export default {
  components: {
    CiscoLogo
  },

  computed: {
    isAdmin () {
      return true
    }
  }
}
</script>