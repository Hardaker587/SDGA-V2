<script setup>
import { FirebaseService } from './services/firebase.service'

new FirebaseService().firebaseInstance()
</script>

<template>
  <NuxtPage data-theme="light" />
</template>
