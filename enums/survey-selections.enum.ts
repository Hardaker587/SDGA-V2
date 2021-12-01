export enum SurveySelectionsEnum {
  X = 'X',
  None = 0,
  ALittle = 1,
  Adequate = 2,
  Substantial = 3,
  AGreatDeal = 4,
}

export const GenerateSurveySelections = new Map<any, string>([
  [SurveySelectionsEnum.X, 'Don\'t know'],
  [SurveySelectionsEnum.None, 'None'],
  [SurveySelectionsEnum.ALittle, 'A Little'],
  [SurveySelectionsEnum.Adequate, 'Adequate'],
  [SurveySelectionsEnum.Substantial, 'Substantial'],
  [SurveySelectionsEnum.AGreatDeal, 'A Great Deal'],
])

export const ReturnAllSurveySelections = () => {
  const output = []
  for (const [key, value] of GenerateSurveySelections) {
    output.push({ key, value })
  }
  return output
}
