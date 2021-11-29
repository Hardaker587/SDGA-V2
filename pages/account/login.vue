<template>
  <div class="flex flex-col md:flex-row md:space-x-4 md:h-screen items-center">
    <div
      class="
        flex flex-1 flex-col
        items-center
        hover:justify-center
        md:mb-0
        mb-4
      "
    >
      <div class="text-2xl font-black w-7/12 text-left">
        Sign into your account
      </div>
      <div class="form-control w-7/12">
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
      <div class="form-control w-7/12">
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
        <label class="label">
          <a href="#" class="label-text-alt">Forgot password?</a>
        </label>
      </div>
      <button
        class="btn btn-primary w-7/12"
        @click="$auth().login({ email, password }, () => router.replace('/survey/1'))"
      >
        Log in
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
<script setup>
const router = useRouter()
</script>
<script>
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
export default {
  name: 'login',
  components: { EyeIcon, EyeOffIcon },
  data: () => ({
    email: '',
    password: '',
    displayPassword: false,
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
