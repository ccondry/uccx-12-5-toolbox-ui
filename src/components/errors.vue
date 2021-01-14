<template>
  <panel
  :title="`Fatal Error${fatalErrors.length !== 1 ? 's' : ''}`"
  aria-id="fatal-error"
  type="is-danger"
  >
    <!-- <ol>
      <li v-for="(error, index) of fatalErrors" :key="index">
        {{ error }}
      </li>
    </ol> -->
    <section>
      <b-message
      v-for="(error, index) of fatalErrors"
      :key="index"
      type="is-danger"
      >
        {{ error.message || error }}
      </b-message>
    </section>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'fatalErrors'
    ])
  }
}
</script>
