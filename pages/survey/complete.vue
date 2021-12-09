<script setup>
await authMiddleware()
</script>
<template>
  <div class="relative flex justify-center items-center">
    <lottie-player
      src="https://assets3.lottiefiles.com/packages/lf20_30iie6.json"
      background="transparent"
      speed="1"
      style="width: 100vw; height: 90vh"
      loop
      autoplay
    ></lottie-player>
    <div class="flex flex-col items-center justify-center absolute">
      <img
        src="/images/branding/main-logo.svg"
        id="main_logo"
        alt="social development goals"
      />
      <div class="text-8xl font-black mt-8">Thank you!</div>
      <div class="text-xl mt-2">
        For taking the time to complete our survey!
      </div>
      <div class="flex mt-8" v-if="$authStore().isLoggedIn">
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
  name: 'complete',
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
