import {SetModifier} from "../../../common/models/SetModifier";

export interface ISetAnalysisDefinitionProps {
  SetIdentifier: string;
  SetIdentifierDesc?: string;
  AggregationType: string;
  AggregationTypeDesc?: string;
  FieldExpression: string;
  Bookmark?: string;
  PersonalComment?: string;
  PureDescription?: string;
  Expression?: string;
  SetModifiers?: SetModifier[];
}
