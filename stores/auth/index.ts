import { acceptHMRUpdate, defineStore } from 'pinia'

export const auth_store = defineStore('auth_store', {
  state: () => ({
    loggedIn: false,
    user: null,
    claims: null,
  }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    getUser: (state) => {
      return { ...state.user }
    },
    getclaims: (state) => state.claims,
  },
  actions: {
    set_isLogged_in_status(status: boolean) {
      this.loggedIn = status
    },
    set_user(user: object) {
      this.user = user
    },
    set_claims(claims: object) {
      this.claims = claims
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(auth_store, import.meta.hot))
}
