<template>
  <panel title="Workstation" aria-id="workstation">
    <p>
      After you have connected to the demo session VPN,
      connect to the Workstation using Microsoft Remote Desktop
      Client.
    </p>

    <p>
      Remote Desktop Workstation:
      <strong>{{ rdpAddress }}</strong>
      <copy :value="rdpFqdn" name="Workstation RDP Address" />
    </p>

    <p>
      <!-- credentials -->
      Connect to the Workstation using one of your agent's credentials
      (below).
    </p>

    <p>
      <!-- you can have more than 1 -->
      Create a separate connection profile in Microsoft Remote Desktop
      application to have both agent and supervisor desktops open at the
      same time.
    </p>

    <p>
      <!-- issues -->
      If you have any issues connecting to
      the Workstation using the FQDN, then try using the
      IP address instead.
      <br>
      If you are on Windows, you may need to try rebooting to
      resolve any AnyConnect-related DNS issue.
    </p>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'rdpAddress',
      'rdpFqdn'
    ]),
    test: {
      get () {
        return this.rdpAddress
      },
      set (value) {

      }
    }
  },

  methods: {
    keydown (event) {
      console.log(event)
      event.preventDefault()
    }
  }
}
</script>