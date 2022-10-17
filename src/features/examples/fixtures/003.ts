import {ISetAnalysisDefinitionProps} from "../../wizard/interfaces/ISetAnalysisDefinitionProps";

const item: ISetAnalysisDefinitionProps = {
  "SetIdentifier": "1",
  "AggregationType": "Sum",
  "FieldExpression": "Sales",
  "Bookmark": "",
  "PersonalComment": "Sum of \"Sales\" based on all values, ignoring any selection.",
  "Expression": "Sum({1}Sales)",
  "SetModifiers": []
}

export default item;
