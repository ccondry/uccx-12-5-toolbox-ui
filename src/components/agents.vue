<template>
  <panel title="Agents and Supervisors" aria-id="agents">
    <div style="display: flex; flex-wrap: wrap;">
      <agent
      v-for="(agent, i) of standardAgents"
      :key="i"
      :agent="agent"
      />
    </div>
    <div style="display: flex; flex-wrap: wrap;">
      <agent
      v-for="(agent, i) of supervisors"
      :key="i"
      :agent="agent"
      />
    </div>
  </panel>
</template>


<script>
import {mapGetters} from 'vuex'
import Agent from './agent'

export default {
  components: {
    Agent
  },

  computed: {
    ...mapGetters([
      'agents'
    ]),
    standardAgents () {
      return this.agents.filter(a => a.role === 'Agent')
    },
    supervisors () {
      return this.agents.filter(a => a.role === 'Supervisor')
    }
  }
}
</script>
