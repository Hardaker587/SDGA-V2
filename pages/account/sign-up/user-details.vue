<script setup>
await authMiddleware()
</script>
<template>
  <div
    class="
      flex flex-col-reverse
      md:flex-row md:space-x-4 md:h-screen
      items-center
    "
  >
    <commonLoader v-if="loading" :active="loading" />
    <div
      class="
        flex flex-1 flex-col
        items-center
        hover:justify-center
        md:mb-0
        mb-4
      "
    >
      <div class="text-2xl font-black w-full md:w-7/12 text-left">
        Add some details about you:
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">Display name</span>
        </label>
        <input
          v-model="email"
          placeholder="user@domain.com"
          class="input input-bordered"
          type="text"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">Date of birth</span>
        </label>
        <input
          v-model="password"
          placeholder="Password"
          class="input input-bordered w-full pr-16"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">University</span>
        </label>
        <input
          v-model="email"
          placeholder="user@domain.com"
          class="input input-bordered"
          type="text"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">City</span>
        </label>
        <input
          v-model="email"
          placeholder="user@domain.com"
          class="input input-bordered"
          type="text"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">Province</span>
        </label>
        <input
          v-model="email"
          placeholder="user@domain.com"
          class="input input-bordered"
          type="text"
        />
      </div>
      <button class="btn btn-primary w-full md:w-7/12 mt-4" @click="signUp()">
        Continue to survey
      </button>
    </div>
    <div class="flex flex-1 justify-center md:mb-0 mb-4">
      <div class="flex flex-1 justify-center md:mb-0 mb-4">
        <img
          src="/images/branding/main-logo.svg"
          id="main_logo"
          alt="social development goals"
        />
      </div>
    </div>
  </div>
</template>

<script>
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'
export default {
  name: 'user-details',
  components: { commonLoader },
  data: () => ({
    loading: false,
  }),
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
  max-width: 500px;
  max-height: 500px;
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