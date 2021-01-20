<template>
  <panel title="Demo Website" aria-id="demo-website">
    <div class="content" style="position: relative">
      <b-loading :active="isLoading || isWorking" :is-full-page="false" />
      <p>
        Choose the vertical you want to use:
      </p>

      <!-- vertical selection -->
      <b-field style="margin-right: 1em;">
        <b-select 
        v-model="vertical" 
        :disabled="working.app.user"
        @change.native="verticalChanged" 
        >
          <option :value="null" disabled selected>
            Choose Your Demo Vertical
          </option>
          <option
          v-for="(brand, index) in systemBrands" 
          :key="'system' + index"
          :value="brand.id"
          >
            {{ `${brand.name} (${brand.id})` }}
          </option>
          <option disabled>
            -----------------------------------------
          </option>
          <option
          v-for="(brand, index) in myBrands"
          :key="'other' + index"
          :value="brand.id"
          >
            {{ `${brand.name} (${brand.id})` }}
          </option>
        </b-select>
      </b-field>

      <p>
        Then click this button to show the customer side of the demo.
      </p>
      <!-- demo website button -->
      <b-field>
        <b-button
        tag="a"
        type="is-success"
        rounded
        :disabled="working.app.user"
        :href="brandDemoLink"
        target="_blank"
        >
          Go to Demo Website
        </b-button>
      </b-field>

      <p>
        Note: You can create and configure your own verticals on the
        <a href="/branding" target="brand-toolbox">
          <strong>Demo Branding Toolbox</strong>
        </a>.
      </p>
    </div>
  </panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      vertical: '',
      multichannel: 'ece'
    }
  },

  computed: {
    ...mapGetters([
      'verticals',
      'working',
      'brandDemoLink',
      'cumulusDemoLink',
      'demoUserConfig',
      'isAdmin',
      'loading',
      'jwtUser'
    ]),
    isWorking () {
      return this.working.user.demoUserConfig
    },
    isLoading () {
      return this.loading.dcloud.verticals || this.loading.dcloud.demoUserConfig
    },
    sortedBrands () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted brands`, e)
        return []
      }
    },
    systemBrands () {
      return this.sortedBrands.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    myBrands () {
      return this.sortedBrands.filter(v => v.owner === this.jwtUser.username)
    }
  },

  watch: {
    verticals (val, oldVal) {
      this.updateSelection()
    },
    vertical (val, oldVal) {
      this.updateSelection()
    },
    demoUserConfig (val) {
      console.log('demo user config changed:', val)
      this.updateCache()
    }
  },

  mounted () {
    this.updateCache()
  },

  methods: {
    ...mapActions([
      'saveDemoUserConfig'
    ]),
    updateCache () {
      try {
        // copy vertical selection to the one in demo config
        this.vertical = this.demoUserConfig.vertical
        // copy multichannel selection option from demo config value
        this.multichannel = this.demoUserConfig.multichannel
      } catch (e) {
        // continue - this.demoUserConfig is probably not ready yet
      }
    },
    updateSelection () {
      const selectedVertical = this.verticals.find(v => v.id === this.vertical)
    },
    multichannelChanged (e) {
      console.log('multichannel changed', e.target.value)
      // construct data body to send to API REST request
      const data = {
        multichannel: e.target.value
      }
      // save vertical
      this.saveDemoUserConfig(data)
    },
    verticalChanged (e) {
      console.log('vertical selected:', e.target.value)
      // construct data body to send to API
      const data = {
        vertical: e.target.value
      }
      // save vertical
      this.saveDemoUserConfig(data)
    },
    clickGo (e) {
      console.log('user clicked button to go to demo website. going to', this.brandDemoLink)
      window.open(this.brandDemoLink, 'brand')
    }
  }
}
</script>
