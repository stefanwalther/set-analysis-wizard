import {ISelectionOperator} from "../../../common/interfaces/ISelectionOperator";

export const SELECTION_OPERATORS: ISelectionOperator[] = [
  {
    value: 'equal_to',
    label: 'equal to'
  },
  // Todo: commented out in the legacy code, not really sure why ???!
  // {
  //   value: 'not_equal_to',
  //   label: 'not equal to',
  // },
  {
    value: 'greater_than',
    label: 'greater than',
  },
  {
    value: 'less_than',
    label: 'less than',
  },
  {
    value: 'greater_than_or_equal',
    label: 'greater than or equal to',
  },
  {
    value: 'less_than_or_equal',
    label: 'less than or equal to',
  },
  {
    value: 'contains',
    label: 'contains',
  },
  {
    value: 'startswith',
    label: 'starts with',
  },
  {
    value: 'endswith',
    label: 'ends with',
  },
  {
    value: 'between_gt_lt',
    label: 'between (> val1 < val2)',
  },
  {
    value: 'between_gt=_lt',
    label: 'between (&gt;= val1 &lt; val2)',
  },
  {
    value: 'between_gt=_lt=',
    label: 'between (&gt;= val1 &lt;= val2)',
  },
  {
    value: 'between_gt_lt=',
    label: 'between (&gt; val1 &lt;= val2)',
  },
];
