<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else-if="!loading && user" class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <div class="flex items-center flex-1">
        <button
          class="btn btn-circle mr-4 btn-sm md:btn-md"
          @click="$router.push('/survey')"
        >
          <ChevronLeftIcon class="w-8" />
        </button>
        <h1 class="text-lg md:text-2xl font-black">
          Profile:
          {{
            user.displayName ??
            `${user.firstName} ${user.lastName}` ??
            user.email
          }}
        </h1>
      </div>
      <button
        class="btn btn-primary mr-2 btn-sm md:btn-md"
        @click="$router.replace('/account/sign-up/user-details?update=true')"
      >
        Update your profile
      </button>
    </div>
    <div
      v-for="(userDetail, index) in Object.keys(user)"
      :key="`user-${user.id}-${userDetail}`"
      class="grid grid-cols-2 truncate mb-1 bg-white p-2 rounded"
    >
      <div class="font-bold title">{{ userDetail }}:</div>
      <div class="border-l-2 pl-2">{{ user[userDetail] }}</div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'
export default {
  name: 'profile',
  data: () => ({
    loading: true,
    user: null,
  }),
  components: {
    ChevronLeftIcon,
    commonLoader,
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const user = this.$authStore().getUser
      await this.$firestore()
        .getOneDocument('users', user.uid)
        .then(
          (res) =>
            (this.user = {
              email: user.email,
              displayName: user.displayName,
              accountId: user.id,
              ...user.metadata,
              ...res,
            })
        )
        .finally(() => (this.loading = false))
    },
  },
}
</script>
