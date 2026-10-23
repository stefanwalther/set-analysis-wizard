import {IFieldOperator} from "../../../common/interfaces";

export const FIELD_OPERATORS: IFieldOperator[] = [
  {
    value: '=',
    label: 'Select values explicitly (=)',
  },
  {
    value: '+=',
    label: 'Additionally select values (+=)'
  },
  {
    value: '-=',
    label: 'Exclude values (-=)'
  },
  {
    value: '*=',
    label: 'Select with positive intersection (*=)'
  },
  {
    value: '/=',
    label: 'Select with negative intersection (/=)'
  }
];
