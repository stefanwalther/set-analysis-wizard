export interface ISetModifierAction {
  Action: string;
  Field: string;
  OtherField: string;
  FieldOperator: string; // should be '=' by defualt
  ValuesOrExpression_1: string;
  ValuesOrExpression_2: string;
  SelectionOperator: string;
  IndirectField: string;
  TechnicalModifier: string;
}
