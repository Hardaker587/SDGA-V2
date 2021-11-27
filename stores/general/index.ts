import { acceptHMRUpdate, defineStore } from 'pinia'

export const general_store = defineStore('general_store', {
  state: () => ({
    loading: false,
  }),
  getters: {
    get_loading_status: (state) => state.loading,
  },
  actions: {
    set_loading_status(status: boolean) {
      this.loading = status
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(general_store, import.meta.hot))
}