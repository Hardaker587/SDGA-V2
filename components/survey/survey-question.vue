<template>
  <div class="flex flex-col mb-4">
    <div class="flex-1 mb-1">{{ title }}</div>
    <div class="grid md:grid-cols-6 md:gap-2">
      <div
        v-for="selection in selections"
        :key="selection"
        class="flex md:flex-col items-center p-2"
        :class="highlightSelection(selection)"
        @click="addSelection(selection)"
      >
        <input
          :checked="returnActiveSelection(selection)"
          type="radio"
          class="mr-2 md:mb-1 md:mr-0"
        />
        <div class="md:mt-1 text-xs">{{ selection.value }}</div>
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
    chosenSelection: null,
  }),
  computed: {
    selections() {
      const output = []
      for (const [key, value] of GenerateSurveySelections) {
        output.push({ key, value })
      }
      return output
    },
    selectionInStore() {
      return this.$surveyStore().get_survey_user_selections.find(
        (selection) => selection.questionId === this.question
      )
    },
  },
  methods: {
    highlightSelection(selection) {
      if (selection?.key === this.selectionInStore?.key)
        return 'bg-primary rounded-box text-white'
    },
    returnActiveSelection(selection) {
      return this.selectionInStore?.key === selection.key
    },
    addSelection(selection) {
      this.$surveyStore().set_survey_user_selections({
        questionId: this.question,
        categoryId: this.category,
        goalId: this.goal,
        questionTitle: this.title,
        ...selection,
      })
    },
  },
}
</script>

<style></style>
