<template>
  <panel title="Provision" aria-id="provision">
    <b-loading :is-full-page="false" :active="loading.user.provision" />
    <!-- provisioning is not enabled for this instance -->
    <div v-if="isLocked">
      <p>
        Provisioning is disabled for this demo instance. Please try using
        another dCloud datacenter or a newer version of this demo (if one is
        available).
      </p>
    </div>

    <!-- provision is enabled and not started yet -->
    <div v-if="!isLocked && !provisionStatus && !provisionStarted">
      <p>
        Would you like to provision your account?
      </p>
      <b-field v-if="!isLocked && !provisionStatus">
        <b-button
        :disabled="working.user.provision"
        type="is-success"
        rounded
        expanded
        @click.prevent="clickProvision"
        >
          {{ buttonText }}
        </b-button>
      </b-field>
    </div>

    <!-- provision in progress -->
    <div v-if="provisionStarted || provisionStatus === 'working'">
      <p>
        Your account is being provisioned. It may take up to 20 minutes for it to
        complete.
      </p>

      <p>
        This page will automatically change when your account is ready to use.
      </p>
      
      Provision progress:
      <b-progress
      :value="percentDone"
      size="is-medium"
      show-value
      type="is-success"
      >
        {{ tasksDone }} / {{ totalTasks }}
      </b-progress>

      <p v-if="waitingOnTask">
        Currently waiting on {{ waitingOnTask }}...
      </p>
    </div>

    <!-- <pre>
      {{ provision }}
    </pre> -->
  </panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      totalTasks: 38,
      taskNames: {
        uccxUserSync: 'UCCX to sync new agents',
        finesseTeamSync: 'Finesse to sync new teams',
        cucmLdapSync: 'CUCM to sync new users'
      }
    }
  },
  computed: {
    ...mapGetters([
      'jwtUser',
      'working',
      'sessionId',
      'isLocked',
      'provision',
      'provisionStatus',
      'provisionStarted',
      'loading'
    ]),
    buttonText () {
      if (this.working.user.provision) {
        return `Working...`       
      } else {
        return 'Provision Me'
      }
    },
    percentDone () {
      try {
        if (this.provision.status === 'complete') {
          // 100% done if status is complete
          return 100
        } else {
          // calculate percent of the total tasks are done (set to true)
          return this.tasksDone / this.totalTasks * 100
        }
      } catch (e) {
        return 0
      }
    },
    tasksDone () {
      try {
        // return number of completed tasks in provision status
        const keys = Object.keys(this.provision)
        const progressKeys = keys.filter(k => this.provision[k] === true)
        return progressKeys.length
      } catch (e) {
        return 0
      }
    },
    waitingOnTask () {
      try {
        const keys = Object.keys(this.provision)
        const key = keys.filter(k => k !== 'status').find(k => {
          try {
            return this.provision[k].startsWith('working')
          } catch (e) {
            return false
          }
        })
        return this.taskNames[key] || key
      } catch (e) {
        return null
      }
    }
  },

  methods: {
    ...mapActions([
      'provisionUser'
    ]),
    clickProvision () {
      console.log('user clicked Provision Me button')
      this.$buefy.dialog.prompt({
        title: 'Provision',
        message: `Please choose a new password for your VPN account. <br>Do not reuse your Cisco account password.`,
        inputAttrs: {
          placeholder: 'Your new VPN password',
          type: 'password'
        },
        rounded: true,
        confirmText: 'Submit',
        type: 'is-success',
        onConfirm: password => {
          this.provisionUser(password)
          // first provision
        }
      })
    }
  }
}
</script>