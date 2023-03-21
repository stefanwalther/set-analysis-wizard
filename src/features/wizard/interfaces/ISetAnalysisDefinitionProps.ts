import {ISetModifier} from "../../../common/interfaces";

export interface ISetAnalysisDefinitionProps {
  SetIdentifier: string;
  SetIdentifierDesc?: string;
  AggregationType: string;
  AggregationTypeDesc?: string;
  FieldExpression: string;
  Bookmark?: string;
  PersonalComment?: string;
  Expression?: string;
  SetModifiers: ISetModifier[];
  PureDescription?: string;
  ExpressionWithComments?: string;
}
