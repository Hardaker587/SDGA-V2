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
      <div
        v-if="updating"
        class="text-2xl font-black w-full md:w-7/12 text-left"
      >
        Update your details
      </div>
      <div v-else class="text-2xl font-black w-full md:w-7/12 text-left">
        Add some details about you:
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label" for="displayName">
          <span class="label-text">Display name</span>
        </label>
        <input
          v-model="userDetails.displayName"
          id="displayName"
          placeholder="Joe Soap"
          class="input input-bordered"
          type="text"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label" for="dateOfBirth">
          <span class="label-text">Date of birth</span>
        </label>
        <input
          v-model="userDetails.dateOfBirth"
          id="dateOfBirth"
          placeholder="01/12/1996"
          class="input input-bordered w-full pr-16"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label for="universities" class="label">
          <span class="label-text">University</span>
        </label>
        <select
          v-model="userDetails.university"
          id="universities"
          class="input input-bordered"
        >
          <option value="">Please select a university</option>
          <option
            v-for="university in universities"
            :key="university"
            :value="university"
          >
            {{ university }}
          </option>
        </select>
      </div>
      <div class="form-control w-full md:w-7/12">
        <label class="label" for="city">
          <span class="label-text">City</span>
        </label>
        <input
          v-model="userDetails.city"
          id="city"
          placeholder="Johannesburg"
          class="input input-bordered"
          type="text"
        />
      </div>
      <div class="form-control w-full md:w-7/12">
        <label for="provinces" class="label">
          <span class="label-text">Province</span>
        </label>
        <select
          v-model="userDetails.province"
          id="provinces"
          class="input input-bordered"
        >
          <option value="">Please select your province</option>
          <option
            v-for="province in provinces"
            :key="province"
            :value="province"
          >
            {{ province }}
          </option>
        </select>
      </div>
      <button
        v-if="updating"
        class="btn btn-primary w-full md:w-7/12 mt-4"
        @click="completeProfile()"
      >
        Save and continue
      </button>
      <button
        v-else
        class="btn btn-primary w-full md:w-7/12 mt-4"
        @click="completeProfile()"
      >
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
    userDetails: {
      displayName: '',
      dateOfBirth: '',
      university: '',
      city: '',
      province: '',
    },
    universities: [
      'University of Cape Town',
      'University of Fort Hare',
      'University of the Free State',
      'University of KwaZulu-Natal',
      'University of Limpopo',
      'North-West University',
      'University of Pretoria',
      'Rhodes University',
      'Sefako Makgatho Health Sciences University',
      'University of Stellenbosch',
      'University of the Western Cape',
      'University of the Witwatersrand',
      'UNISA',
    ],
    provinces: [
      'Gauteng',
      'Western Cape',
      'Eastern Cape',
      'Northern Cape',
      'Mpumalanga',
      'Limpopo',
      'Free State',
      'North West',
      'Kwa-Zulu Natal',
    ],
  }),
  computed: {
    updating() {
      return this.$route.query.update
    },
  },
  mounted() {
    if (this.updating) this.getUser()
  },
  methods: {
    async getUser() {
      const user = this.$authStore().getUser
      await this.$firestore()
        .getOneDocument('users', user.uid)
        .then((res) => {
          this.userDetails = { ...this.userDetails, ...res }
        })
    },
    async completeProfile() {
      try {
        await this.$auth()
          .updateProfile({ displayName: this.userDetails.displayName })
          .then(() => {
            const user = this.$authStore().getUser
            this.$firestore().addDocument('users', user.uid, {
              email: user.email,
              ...this.userDetails,
            })
          })
          .then(() => {
            this.$router.push('/survey')
          })
      } catch (e) {}
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
