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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  }
}
</script>