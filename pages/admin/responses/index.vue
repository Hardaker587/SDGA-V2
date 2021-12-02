<template>
  <commonLoader v-if="loading" :active="loading" />
  <div v-else class="md:w-8/12 mx-auto">
    <div class="flex items-center mb-4">
      <button class="btn btn-circle mr-4 btn-sm md:btn-md" @click="$router.push('/admin')">
        <ChevronLeftIcon class="w-8" />
      </button>
      <h1 class="text-lg md:text-2xl font-black">Responses</h1>
    </div>
    <Disclosure
      v-for="response in responses"
      :key="response.id"
      v-slot="{ open }"
    >
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
        "
      >
        <div class="flex-1">User: {{ response.user.email }}</div>
        <div class="text-right">Submitted: {{ response.submission.date }}</div>
        <ChevronDownIcon
          :class="open ? 'transform rotate-180' : ''"
          class="w-5 h-5"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pb-2">
        <div
          v-for="responseSelection in response.responses"
          :key="responseSelection.questionId"
          class="flex mb-2"
        >
          <div class="w-10/12 truncate">
            {{ responseSelection.questionTitle }}
          </div>
          <div class="w-2/12 text-right">{{ responseSelection.value }}</div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/vue/solid'
import commonLoader from '@/components/layouts/common/layouts-common-overlay.vue'

export default {
  name: 'index',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
    ChevronLeftIcon,
    commonLoader,
  },
  data: () => ({
    loading: true,
    responses: null,
  }),
  mounted() {
    this.fetchResponses()
  },
  methods: {
    fetchResponses() {
      this.$firestore()
        .getAllDocuments('responses')
        .then((res) => (this.responses = res))
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
