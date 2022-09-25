import {ISetAnalysisDefinitionProps} from "../../wizard/interfaces/ISetAnalysisDefinitionProps";

const item: ISetAnalysisDefinitionProps = {
  SetIdentifier: "$",
  AggregationType: "Sum",
  FieldExpression: "Sales",
  PersonalComment: "Calculate the sum of \"Sales\" (based on the current selection).",
  Expression: "Sum({$}Sales)",
  SetModifierActions: undefined,
}

export default item;
