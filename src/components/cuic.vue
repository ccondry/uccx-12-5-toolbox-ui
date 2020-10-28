<template>
  <panel title="CUIC Reporting" aria-id="cuic">
    <p>
      Log in to
      <a :href="url" target="cuic">
        CUIC
      </a>
      using your supervisor credentials, listed below.
      <br>
      You must be on the Workstation and/or the VPN to access the CUIC server.
    </p>
    <ul>
      <li>
        URL:
        <strong>
          <a :href="url" target="cuic">
            {{ url }}
          </a>
        </strong>
      </li>
      <li>
        Username:
        <strong>
          {{ supervisor.rdpUsername }}
          <copy :value="supervisor.rdpUsername" name="CUIC Username" />
        </strong>
      </li>
      <li>
        Password:
        <strong>
          C1sco12345
          <copy :value="supervisor.password" name="CUIC Password" />
        </strong>
      </li>
      <!-- <li>
        Login Type:
        <strong>
          LDAP
        </strong>
      </li> -->
    </ul>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      url: 'https://cuic1.dcloud.cisco.com'
    }
  },

  computed: {
    ...mapGetters([
      'jwtUser',
      'datacenter',
      'sessionId',
      'agents'
    ]),
    supervisor () {
      return this.agents.find(v => {
        return v.role === 'Supervisor'
      })
    }
  }
}
</script>