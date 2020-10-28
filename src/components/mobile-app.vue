<template>
  <panel title="dCloud CC Mobile App Settings" aria-id="mobile-app">
    <p>
      Use this information to start the dCloud CC mobile app demo.
    </p>
    <p>
      The pod ID needs to be entered into the Settings screen in order for
      any demo customization to take effect with the mobile chat bot.
    </p>
    <ul>
      <li>Session: <strong>{{ sessionId }}</strong></li>
      <li>Datacenter: <strong>{{ datacenterDisplayName }}</strong></li>
      <li>Pod ID: <strong>{{ jwtUser.id }}</strong></li>
    </ul>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sessionId',
      'datacenterDisplayName',
      'jwtUser'
    ])
  }
}
</script>