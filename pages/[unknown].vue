<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen">
      <img
        src="/images/branding/main-logo.svg"
        id="main_logo"
        alt="social development goals"
      />
      <div class="text-9xl font-black mt-8">404</div>
      <div class="text-xl">
        Looks like we can't find the page you are looking for.
      </div>
      <div class="flex mt-8" v-if="!$authStore().isLoggedIn">
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
      <div class="flex mt-8" v-if="$authStore().isLoggedIn">
        <button
          class="btn btn-primary ml-2 btn-sm md:btn-md"
          @click="$router.replace('/survey')"
        >
          Survey
        </button>
        <button
          v-if="$authStore().getclaims?.admin"
          class="btn btn-error ml-2 btn-sm md:btn-md"
          @click="$router.replace('/admin')"
        >
          Dashboard
        </button>
        <button
          class="btn btn-outline btn-error ml-2 btn-sm md:btn-md"
          @click="$auth().logOut(true)"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '[unknown]',
}
</script>

<style scoped lang="scss">
#main_logo {
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 15s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: rotate;
  -moz-animation-duration: 15s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  max-width: 350px;
  max-height: 350px;
  min-width: 150px;
  min-height: 150px;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>
