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
        @click="$router.replace($authStore().isLoggedIn ? '/survey' : '/')"
      />
    </div>
    <div class="flex" v-if="!$authStore().isLoggedIn">
      <button
        class="btn btn-primary mr-2 btn-sm md:btn-md"
        @click="$router.replace('/account/login')"
      >
        Login
      </button>
      <button
        class="btn btn-outline btn-primary btn-sm md:btn-md"
        @click="$router.replace('/account/sign-up')"
      >
        Sign up
      </button>
    </div>
    <div class="flex" v-if="$authStore().isLoggedIn">
      <div class="hidden md:block">
        <div class="flex flex-col items-end">
          <div class="text-sm">Welcome back</div>
          <div class="text-sm font-black">
            {{
              $authStore().getUser?.displayName ?? $authStore().getUser?.email
            }}
          </div>
        </div>
      </div>
      <button
        v-if="$authStore().getclaims?.admin"
        class="btn btn-error ml-2 btn-sm md:btn-md"
        @click="$router.replace('/admin')"
      >
        Dashboard
      </button>
      <button
        class="btn btn-primary ml-2 btn-sm md:btn-md"
        @click="$router.replace('/account/profile')"
      >
        Profile
      </button>
      <button
        class="btn btn-outline btn-error ml-2 btn-sm md:btn-md"
        @click="$auth().logOut(true)"
      >
        Log out
      </button>
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
  max-height: 30px;
  width: auto;
}
</style>
