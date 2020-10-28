<template>
  <div class="is-parent">
    <!-- logged in -->
    <article class="tile is-child is-white box">
      <div class="content" style="display: flex; flex-direction: column; align-items: center;">
        <small> 
          UI Version {{ uiVersion }}
        </small>
        <small>
          API Version {{ apiVersion }}
        </small>
        <small>
          © 2020 Cisco and/or its affiliates. All rights reserved.
        </small>
        <cisco-logo style="width: 4rem; height: 4rem;" />
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CiscoLogo from '../components/cisco-logo'

export default {
  components: {
    CiscoLogo
  },

  computed: {
    ...mapGetters([
      'uiVersion',
      'apiVersion'
    ])
  }
}
</script>