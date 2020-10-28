<template>
  <b-navbar
  :transparent="true"
  :fixed-top="true"
  style="background-color: rgba(0, 0, 0, 0)"
  >
    <template slot="start">
      <b-navbar-item>
        <b-button
        type="is-info"
        rounded
        tag="a"
        href="/"
        >
          Toolbox Home
        </b-button>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
          v-if="isAdminSu"
          type="is-info"
          rounded
          @click="clickLogout"
          >
            Log Out
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAdminSu'
    ])
  },
  
  methods: {
    ...mapActions([
      'logout'
    ]),
    clickLogout () {
      this.logout()
    }
  }
}
</script>