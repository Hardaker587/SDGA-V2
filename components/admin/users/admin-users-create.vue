<template>
  <div
    class="flex flex-1 flex-col items-center hover:justify-center md:mb-0 mb-4"
  >
    <div class="form-control w-full md:w-7/12">
      <label class="label" for="email">
        <span class="label-text">Email Address</span>
      </label>
      <input
        v-model="userDetails.email"
        id="email"
        placeholder="user@doamin.com"
        class="input input-bordered"
        type="text"
        @keyup="$emit('user-details', userDetails)"
      />
    </div>
    <div class="form-control w-full md:w-7/12 relative">
      <label class="label" for="email">
        <span class="label-text">Password</span>
      </label>
      <input
        v-model="userDetails.password"
        placeholder="Password"
        class="input input-bordered w-full pr-16"
        :type="displayPassword ? 'text' : 'password'"
        @keyup="$emit('user-details', userDetails)"
      />
      <button
        class="absolute bottom-0 right-0 rounded-l-none btn btn-primary"
        @click="displayPassword = !displayPassword"
      >
        <component
          :is="displayPassword ? 'EyeIcon' : 'EyeOffIcon'"
          class="w-5"
        />
      </button>
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
        @keyup="$emit('user-details', userDetails)"
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
        @keyup="$emit('user-details', userDetails)"
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
        @keyup="$emit('user-details', userDetails)"
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
        @keyup="$emit('user-details', userDetails)"
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
        @keyup="$emit('user-details', userDetails)"
      >
        <option value="">Please select your province</option>
        <option v-for="province in provinces" :key="province" :value="province">
          {{ province }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
export default {
  name: 'admin-users-create',
  components: { EyeIcon, EyeOffIcon },
  data: () => ({
    userDetails: {
      email: '',
      password: '',
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
    displayPassword: false,
  }),
}
</script>

<style scoped></style>
