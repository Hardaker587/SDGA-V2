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
        Sign up for an account
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label">
          <span class="label-text">Email address</span>
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
          <span class="label-text">Password</span>
        </label>
        <div class="relative">
          <input
            v-model="password"
            placeholder="Password"
            class="input input-bordered w-full pr-16"
            :type="displayPassword ? 'text' : 'password'"
          />
          <button
            class="absolute top-0 right-0 rounded-l-none btn btn-primary"
            @click="displayPassword = !displayPassword"
          >
            <component
              :is="displayPassword ? 'EyeIcon' : 'EyeOffIcon'"
              class="w-5"
            />
          </button>
        </div>
      </div>
      <button class="btn btn-primary w-full md:w-7/12 mt-4" @click="signUp()">
        Sign up
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

import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
export default {
  name: 'login',
  components: { EyeIcon, EyeOffIcon, commonLoader },
  data: () => ({
    email: '',
    password: '',
    displayPassword: false,
  }),
  methods: {
    signUp() {
      this.loading = true
      return this.$auth().register(
        { email: this.email, password: this.password },
        true,
        '/account/sign-up/user-details'
      )
    },
  },
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
