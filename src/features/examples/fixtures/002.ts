import {ISetAnalysisDefinitionProps} from "../../wizard/interfaces/ISetAnalysisDefinitionProps";

const item: ISetAnalysisDefinitionProps = {
  "SetIdentifier": "$",
  "AggregationType": "Count",
  "FieldExpression": "Customer",
  "Bookmark": "",
  "PersonalComment": "Count values of field \"Customer\" based on the current selection.",
  "Expression": "Count({$}Customer)",
  "SetModifiers": []
}

export default item;
