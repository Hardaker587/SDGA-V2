<template>
  <div class="flex flex-col mb-4">
    <div class="flex-1 mb-1">{{ sortOrder }}. {{ title }}</div>
    <div class="grid md:grid-cols-5 md:gap-4">
      <div
        v-for="selection in selections"
        :key="selection"
        class="flex md:flex-col items-center p-1"
        :class="highlightSelection(selection.key)"
      >
        <input v-model="chosenSelection" :value="selection.key" type="radio" class="sm:mr-2 md:mb-1"/>
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
  methods: {
    highlightSelection(selection) {
      if (selection === this.chosenSelection) return 'bg-primary rounded-box text-white'
    },
  },
}
</script>

<style></style>
