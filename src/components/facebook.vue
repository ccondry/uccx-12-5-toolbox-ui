<template>
  <panel title="Cumulus Facebook Page" aria-id="facebook">
    <p>
      Use these links to access the Cumulus Facebook for the AI/Chat Bot
      demo.
    </p>
    <ul>
      <li>
        Facebook Page:
        <strong>
          <a :href="facebookLink" target="facebook">{{ facebookLink }}</a>
        </strong>
      </li>
      <li>
        Messenger Link: 
        <strong>
          <a :href="messengerLink" target="messenger">{{ messengerLink }}</a>
        </strong>
      </li>
      <li>
        Session: <strong>{{ sessionId }}</strong>
        <copy :value="sessionId" name="Session ID" />
      </li>
      <li>
        Datacenter: <strong>{{ datacenter }}</strong>
        <copy :value="datacenter" name="Datacenter" />
      </li>
      <li>
        User ID: <strong>{{ jwtUser.id }}</strong>
        <copy :value="jwtUser.id" name="User ID" />
      </li>
    </ul>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      facebookLink: 'https://fb.com/103018720547240',
      messengerLink: 'https://m.me/103018720547240'
    }
  },

  computed: {
    ...mapGetters([
      'jwtUser',
      'datacenter',
      'sessionId'
    ])
  }
}
</script>