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
      <div class="form-control mr-2 relative">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search Users"
          class="input"
        />
        <button
          v-if="searchTerm"
          class="absolute top-0 right-0 rounded-l-none btn btn-error text-white"
          @click="searchTerm = ''"
        >
          <TrashIcon class="w-4" />
        </button>
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
    <Disclosure v-for="user in filteredUsers" :key="user.id" v-slot="{ open }">
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
        <div class="flex-1">
          {{ user.firstName ?? user.displayName }} {{ user.lastName ?? '' }}
        </div>
        <BadgeCheckIcon v-if="user.admin" class="w-8 mr-2 text-blue-500" />
        <ChevronDownIcon
          :class="open ? 'transform rotate-180' : ''"
          class="w-5 h-5"
        />
      </DisclosureButton>
      <DisclosurePanel class="pb-2">
        <div>
          <div
            v-for="(userDetail, index) in Object.keys(user)"
            :key="`user-${user.id}-${userDetail}`"
            class="grid grid-cols-2 truncate mb-1 bg-white p-2 rounded"
          >
            <div class="font-bold title">{{ userDetail }}:</div>
            <div class="border-l-2 pl-2">{{ user[userDetail] }}</div>
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
  TrashIcon,
} from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  name: 'index',
  data: () => ({
    users: null,
    loading: true,
    searchTerm: '',
  }),
  components: {
    UserIcon,
    ChevronLeftIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TrashIcon,
    ChevronDownIcon,
    BadgeCheckIcon,
    commonLoader,
  },
  computed: {
    filteredUsers() {
      if (!this.searchTerm) return this.users
      if (this.searchTerm)
        return this.users.filter((user) => {
          const searchName =
            user.displayName ?? `${user.firstName} ${user.lastName}`
          return searchName
            .toUpperCase()
            .includes(this.searchTerm.toUpperCase())
        })
    },
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
