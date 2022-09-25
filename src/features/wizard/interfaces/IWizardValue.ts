import {ISetAnalysisDefinitionProps} from "./ISetAnalysisDefinitionProps";

export interface IWizardValue extends ISetAnalysisDefinitionProps {
}

export const InitialWizardValue: IWizardValue = {
  SetIdentifier: "",
  AggregationType: "",
  FieldExpression: "",
  Bookmark: "",
}
