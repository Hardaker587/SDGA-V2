<template>
  <div class="flex md:grid grid-cols-2 gap-4 space-x-4 mb-4">
    <div class="flex-1">{{ sortOrder }}. {{ title }}</div>
    <div class="grid grid-cols-5 gap-4">
      <div v-for="n in 5" :key="n">
        {{ n }}
        <input type="radio" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'survey-question',
  props: {
    goal: { type: String, required: true, default: '' },
    category: { type: String, required: true, default: '' },
    question: { type: String, required: true, default: '' },
    title: { type: String, required: true, default: '' },
    sortOrder: { type: String, required: true, default: '' },
  },
}
</script>

<style></style>
