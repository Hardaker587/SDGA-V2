<template>
  <div class="navbar mb-2 shadow-lg sticky top-0 z-50 bg-white">
    <div class="flex-none lg:flex">
      <NavigationDrawer />
    </div>
    <div class="flex-1 px-2 mx-2 lg:flex">
      <img
        class="header-logo"
        src="/images/branding/sustainable-development.svg"
        alt=""
      />
    </div>
    <div class="flex" v-if="!$authStore().isLoggedIn">
      <button
        class="btn btn-primary mr-2"
        @click="$router.replace('/account/login')"
      >
        Login
      </button>
      <button
        class="btn btn-outline btn-primary"
        @click="$router.replace('/account/sign-up')"
      >
        Sign up
      </button>
    </div>
    <div class="flex" v-if="$authStore().isLoggedIn">
      {{ $authStore().getUser?.email }}
      <button class="btn btn-outline btn-error ml-4" @click="$auth().logOut(true)">Log out</button>
    </div>
  </div>
</template>

<script>
import NavigationDrawer from '@/components/layouts/common/layouts-common-navigation-drawer.vue'
export default {
  name: 'common-header',
  components: { NavigationDrawer },
  computed: {
    user() {
      return this.$authStore().getUser
    },
  },
}
</script>

<style scoped>
.header-logo {
  max-height: 45px;
  width: auto;
}
</style>
