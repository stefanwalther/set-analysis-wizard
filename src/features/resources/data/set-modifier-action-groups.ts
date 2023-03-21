import {ISetModifierActionGroup} from "../../../common/interfaces";

export const SET_MODIFIER_ACTION_GROUPS: ISetModifierActionGroup[] = [
  {
    label: 'Standard Set Modifiers',
    items: [
      {
        value: 'set_remove',
        label: 'Remove selection in field'
      },
      {
        value: 'set_modify_by_value',
        label: 'Modify the set explicitely by defining values'
      },
      {
        value: 'set_modify_by_expression',
        label: 'Modify the set by using expressions'
      }
    ]
  },
  {
    label: 'Indirect Set Analysis (using explicit values)',
    items: [
      {
        value: 'set_pindirect',
        label: 'Select values based on selections (by value) in another field'
      },
      {
        value: 'set_eindirect',
        label: 'Select values based on INVERSE selection (by value) in another field'
      }
    ]
  },
  {
    label: 'Indirect Set Analysis (using expressions)',
    items: [
      {
        value: 'set_pindirect_exp',
        label: 'Select values based on selections (by expression) in another field'
      },
      {
        value: 'set_eindirect_exp',
        label: 'Select values based on INVERSE selection (by expression) in another field'
      },
    ]
  }
];
