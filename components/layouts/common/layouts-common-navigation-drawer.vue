<template>
  <div>
    <button class="m-2" aria-label="Open Menu" @click="drawer">
      <MenuIcon class="w-10" />
    </button>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="
        transform
        top-0
        left-0
        w-64
        bg-white
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-30
      "
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b justify-between"
      >
        <img
          class="h-auto w-32"
          src="/images/branding/sustainable-development.svg"
          alt=""
        />
        <XIcon class="w-4" @click="isOpen = false" />
      </span>
      <div
        v-for="navigationItem in navigationItems"
        :key="navigationItem.title"
        class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"
        @click="navigate(navigationItem.route)"
      >
        <component :is="navigationItem.icon" class="w-6 mr-4" />
        <span>{{ navigationItem.title }}</span>
      </div>
    </aside>
  </div>
</template>

<script>
import {
  MenuIcon,
  HomeIcon,
  XIcon,
  QuestionMarkCircleIcon,
  DocumentReportIcon,
  AnnotationIcon,
  UserCircleIcon,
} from '@heroicons/vue/solid'
export default {
  name: 'layouts-common-navigation-drawer',
  components: {
    MenuIcon,
    HomeIcon,
    XIcon,
    QuestionMarkCircleIcon,
    DocumentReportIcon,
    AnnotationIcon,
    UserCircleIcon,
  },
  data: () => ({
    isOpen: false,
    navigationItems: [
      { title: 'Home', icon: HomeIcon, route: '/' },
      { title: 'Survey', icon: HomeIcon, route: '/survey/1' },
      {
        title: 'Questions',
        icon: QuestionMarkCircleIcon,
        route: '/admin/questions',
      },
      {
        title: 'Reports',
        icon: DocumentReportIcon,
        route: '/admin/reports',
      },
      {
        title: 'Responses',
        icon: AnnotationIcon,
        route: '/admin/responses',
      },
      {
        title: 'Users',
        icon: UserCircleIcon,
        route: '/admin/users',
      },
    ],
  }),
  methods: {
    drawer() {
      this.isOpen = !this.isOpen
    },
    navigate(route) {
      this.drawer()
      this.$router.push(route)
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false
    })
  },
}
</script>

<style scoped></style>
