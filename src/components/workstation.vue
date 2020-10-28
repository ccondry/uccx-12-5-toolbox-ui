<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-12">
      <article class="tile is-child box">
        <h1 class="title">
          Workstation
        </h1>
        <div class="content">
          <p>
            After you have connected to the demo session VPN,
            connect to the Workstation using Microsoft Remote Desktop
            Client to start the demo.
          </p>
          <p>
            If you have any issues connecting to
            the Workstation using the FQDN, then try using the
            IP address instead.
          </p>
          <small>
            If you are on Windows, you may need to try rebooting to
            resolve any AnyConnect-related DNS issue.
          </small>
          <p>
            Remote Desktop Workstation Address:
            <strong>{{ rdpAddress }}</strong>
            <a @click="clickCopy(rdpFqdn, 'Workstation RDP Address')">
              <b-icon icon="layers" />
            </a>
          </p>
          <p>
            <!-- Remote Desktop Workstation Credentials: -->
            Connect to the Workstation using your agents' credentials below.
          </p>
          <p>
            <!-- you can have more than 1 -->
            Create a separate connection profile in Microsoft Remote Desktop
            application to have both agent and supervisor desktops open at the
            same time.
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rdpAddress () { 
      return 'asfd'
    }
  }
}
</script>