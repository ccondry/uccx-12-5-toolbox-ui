<template>
  <panel
  title="Loading..."
  aria-id="loading"
  >
    <div style="height: 6rem; width: 10rem;">
      <b-loading :is-full-page="false" :active="true" />
    </div>
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
