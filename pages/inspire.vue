<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;{{ this.$auth.user }}</em>
          </small>
          <v-btn
            rounded
            dark
            class="mb-3"
            style="background: #082543"
            @click="refreshTokens"
            >Refresh Tokens</v-btn
          >
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Inspire',
  methods: {
    refreshTokens() {
      this.$auth.refreshTokens().catch((e) => {
        this.error = e + ''
      })
    },
  },
}
</script>
