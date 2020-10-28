<template>
  <panel title="Whatsapp" aria-id="whatsapp">
    <ol>
      <li>
        Use the dCloud CC mobile app to place a call or start a normal chat
        <b-tooltip :label="info" position="is-right" multilined>
          <b-icon icon="help-circle" type="is-primary" />
        </b-tooltip>
      </li>

      <li>
        Send "<strong>{{ whatsappJoinMessage }}</strong>" to
        <strong>{{ whatsappPhoneNumber }}</strong> using Whatsapp,
        or scan this QR code to do it automatically:
      </li>
    </ol>
    <div style="display: flex; justify-content: space-around;">
      <img :src="whatsappQrUrl">
    </div>
  </panel>
</template>

<script>
export default {
  data () {
    return {
      whatsappJoinMessage: 'join malachite-stork',
      whatsappPhoneNumber: '+1 (415) 523-8886',
      whatsappQrUrl: 'https://mm-static.cxdemo.net/whatsapp-qr.png',
      info: `This will put your contact info into the database for the chat bot
      to identify you on Whatsapp. This needs to be done again if you haven't
      used the mobile app demo for one week.`
    }
  }
}
</script>