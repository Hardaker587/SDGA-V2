<script setup>
await adminMiddleware()
</script>

<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <div class="flex items-center flex-1">
        <button
          class="btn btn-circle mr-4 btn-sm md:btn-md"
          @click="$router.push('/admin')"
        >
          <ChevronLeftIcon class="w-8" />
        </button>
        <h1 class="text-lg md:text-2xl font-black">Users</h1>
      </div>

      <button
        class="btn btn-primary mr-2 btn-sm md:btn-md"
        @click="$router.replace('/admin/users/new')"
      >
        New User
      </button>
      <button
        class="btn btn-outline btn-primary btn-sm md:btn-md"
        @click="$router.replace('/admin/users/new/admin')"
      >
        New Admin User
      </button>
    </div>
    <Disclosure v-for="user in users" :key="user.id" v-slot="{ open }">
      <DisclosureButton
        class="
          flex
          justify-between
          w-full
          p-4
          font-medium
          text-left
          mb-2
          text-white
          bg-gray-700
          items-center
        "
      >
        <UserIcon class="w-4 mr-2" />
        <div class="flex-1">{{ user.firstName }} {{ user.lastName }}</div>
        <BadgeCheckIcon v-if="user.admin" class="w-8 mr-2 text-blue-500" />
        <ChevronDownIcon
          :class="open ? 'transform rotate-180' : ''"
          class="w-5 h-5"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pb-2">
        <div>
          <div
            v-for="(userDetail, index) in Object.keys(user)"
            :key="`user-${user.id}-${userDetail}`"
            class="grid grid-cols-2 truncate mb-1 bg-white p-2 rounded-box"
          >
            <div class="font-bold title">{{ userDetail }}:</div>
            <div>{{ user[userDetail] }}</div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  UserIcon,
  BadgeCheckIcon,
} from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  name: 'index',
  data: () => ({
    users: null,
    loading: true,
  }),
  components: {
    UserIcon,
    ChevronLeftIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
    BadgeCheckIcon,
    commonLoader,
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.$firestore()
        .getAllDocuments('users')
        .then((res) => (this.users = res))
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
