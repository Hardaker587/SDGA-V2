<template>
  <NuxtLayout>
    <NuxtPage data-theme="light" />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
<script setup lang="ts"></script>
