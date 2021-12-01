import { acceptHMRUpdate, defineStore } from 'pinia'
import { SurveySelectionInterface } from '../../interfaces/survey/SurveySelection.interface'

export const survey_store = defineStore('survey_store', {
  state: () => ({
    surveyUserSelections: [],
  }),
  getters: {
    get_survey_user_selections: (state) => state.surveyUserSelections,
  },
  actions: {
    set_survey_user_selections(selection: SurveySelectionInterface) {
      if (
        this.surveyUserSelections.some(
          (surveySelection) =>
            selection.questionId === surveySelection.questionId
        )
      ) {
        this.surveyUserSelections.splice(
          this.surveyUserSelections.indexOf(selection),
          1
        )
        this.surveyUserSelections.push(selection)
      } else {
        this.surveyUserSelections.push(selection)
      }
      this.loading = status
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(survey_store, import.meta.hot))
}
