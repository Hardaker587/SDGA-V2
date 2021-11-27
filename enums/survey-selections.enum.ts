export enum SurveySelectionsEnum {
  X = 'X',
  None = 0,
  ALittle = 1,
  Adequate = 2,
  Substantial = 3,
  AGreatDeal = 4,
}

const GenerateSurveySelections = new Map<any, string>([
  [SurveySelectionsEnum.X, 'X'],
  [SurveySelectionsEnum.None, 'None'],
  [SurveySelectionsEnum.ALittle, 'A Little'],
  [SurveySelectionsEnum.Adequate, 'Adequate'],
  [SurveySelectionsEnum.AGreatDeal, 'A Great Deal'],
])

export default GenerateSurveySelections
