<template>
  <div class="flex flex-col md:grid grid-cols-2 gap-4 space-x-4 mb-4">
    <div class="flex-1">{{ sortOrder }}. {{ title }}</div>
    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="selection in selections"
        :key="selection"
        class="flex flex-col items-center"
      >
        <input v-model="chosenSelection" :value="selection.key" type="radio" />
        <div class="mt-1 text-xs">{{ selection.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GenerateSurveySelections } from '@/enums/survey-selections.enum'
export default {
  name: 'survey-question',
  props: {
    goal: { type: String, required: true, default: '' },
    category: { type: String, required: true, default: '' },
    question: { type: String, required: true, default: '' },
    title: { type: String, required: true, default: '' },
    sortOrder: { type: String, required: true, default: '' },
  },
  data: () => ({
    chosenSelection: 'X',
  }),
  computed: {
    selections() {
      const output = []
      for (const [key, value] of GenerateSurveySelections) {
        output.push({ key, value })
      }
      return output
    },
  },
}
</script>

<style></style>
