<template>
  <div class="is-parent">
    <!-- logged in -->
    <article
    class="tile is-child is-white flex-container box"
    > 
      <p class="title">
        Welcome {{ jwtUser.firstName }}!
      </p>

      <div class="content">
        <p>
          Welcome to the Cisco Unified Contact Center express 12.5v1 Demo on
          dCloud.
        </p>
        <p>
          Join our Webex Teams support room to get help, ask questions, and
          suggest new features:
        </p>
      </div>
      <b-field>
        <b-button
        type="is-primary"
        rounded
        @click="clickJoinSupportRoom"
        >
          Join Support Room
        </b-button>
      </b-field>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'jwtUser'
    ])
  },

  methods: {
    ...mapActions([
      'joinSupportRoom'
    ]),
    clickJoinSupportRoom () {
      this.$buefy.dialog.prompt({
        title: 'Join Webex Teams Support Room',
        message: `What email address do you use for Webex Teams?`,
        rounded: true,
        confirmText: 'Submit',
        type: 'is-success',
        inputAttrs: {
          value: this.jwtUser.email,
          placeholder: 'Your Webex Teams Email Address'
        },
        onConfirm: (email) => {
          this.joinSupportRoom(email)
        }
      })
    }
  }
}
</script>