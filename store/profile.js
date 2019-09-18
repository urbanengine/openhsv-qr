export const state = () => ({
  picture: null,
  name: null,
  email: null,
  email_verified: null,
  sub: null 
})

export const mutations = {
  set(state, payload) {
    state.picture = payload.picture
    state.name = payload.name
    state.email = payload.email
    state.email_verified = payload.email_verified
    state.sub = payload.sub
  },
  reset(state) {
    state.picture = null
    state.name = null
    state.email = null
    state.email_verified = null
    state.sub = null
  }
}