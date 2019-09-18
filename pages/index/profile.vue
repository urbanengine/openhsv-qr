<template>
  <div
    id="profile-page"
    v-show="loaded"
  >
    <img class="profile-picture" :src="profile.picture"/>

    <p>
      <b>Name: </b> {{ profile.name }}
    </p>

    <p>
      <b>Email: </b> {{ profile.email}}
    </p>

    <p>
      <b>Email verified: </b> {{ profile.email_verified}}
    </p>

    <p>
      <b>Sub: </b> {{ profile.sub}}
    </p>

    <vue-qr :dotScale="dotScale" :text="profile.sub" :size="size" />
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import { mapState } from 'vuex'

export default {
  middleware: ['authenticated'],
  components: { VueQr },
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  },
  data () {
    return {
      dotScale: 1,
      size: 300,
      loaded:  false,
    }
  },

  mounted () {
    console.log('mounted')
    this.fetchUser()
  },

  methods: {
    async fetchUser () {
      try {
        if (!this.$store.state.profile.sub) {
          const profile = await this.$auth0Lock.getProfile(this.$store.state.auth.accessToken)

          console.log(profile)
          this.$store.commit('profile/set', {
            picture: profile.picture,
            name: profile.name,
            email: profile.email,
            email_verified: profile.email_verified,
            sub: profile.sub
          })
        }
        this.loaded = true
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
#profile-page {
  padding-top: 32px;
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
