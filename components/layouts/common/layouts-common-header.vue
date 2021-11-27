<template>
  <div class="navbar mb-2 shadow-lg sticky top-0 z-50">
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
  </div>
</template>

<script>
import NavigationDrawer from '@/components/layouts/common/layouts-common-navigation-drawer.vue'
export default {
  name: 'common-header',
  components: { NavigationDrawer },
}
</script>

<style scoped>
.header-logo {
  max-height: 45px;
  width: auto;
}
</style>
