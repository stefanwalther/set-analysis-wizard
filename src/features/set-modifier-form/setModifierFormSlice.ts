import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {ActionEnum} from "./enums/ActionEnum";
import {SetModifier} from "../../common/models/SetModifier";
import {ISetModifier, setModifierInitialValues} from "../../common/interfaces";
import {v4 as uuidv4} from 'uuid';

// Todo: we could/should just load from the initialState here ...
const setAllInvisible = (state: SetModifierFormState): SetModifierFormState => {
  state.visibility.sm_action = true;
  state.visibility.sm_field_operator = false;
  state.visibility.sm_field_operator_in = false;
  state.visibility.sm_field = false;
  state.visibility.sm_other_field = false;
  state.visibility.sm_selection_operator = false;
  state.visibility.sm_value_1 = false;
  state.visibility.sm_value_2 = false;
  state.visibility.sm_indirect_field = false;
  state.visibility.sm_copy_other_field = false;
  state.visibility.sm_description = false;

  // sections
  state.visibility.sm_section_condition = false;
  state.visibility.sm_section_field = false;
  state.visibility.sm_section_preview = false;
  return state;
}

/**
 * Hide/Unhide fields depending on the action.
 * @param state
 * @param action
 */
const setActionVisibilityLogic = (state: SetModifierFormState, action?: ActionEnum): SetModifierFormState => {

  let s = state.visibility;
  if (typeof action === 'undefined') {
    action = state.formState.Action;
  }

  state = setAllInvisible(state);

  switch (action) {
    case ActionEnum.set_remove:
      // sections
      s.sm_section_field = true;
      s.sm_section_preview = true;

      s.sm_field = true;
      break;
    case ActionEnum.set_select_additionally:
    case ActionEnum.set_modify_by_value:
      // sections
      s.sm_section_field = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;

      s.sm_field = true;
      s.sm_field_operator = true;
      s.sm_field_operator_in = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      break;
    case ActionEnum.set_modify_by_expression:
      // sections
      s.sm_section_field = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;

      s.sm_field = true;
      s.sm_field_operator = true;
      s.sm_field_operator_in = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      break;
    case ActionEnum.set_pindirect:
    case ActionEnum.set_eindirect:
      // sections
      s.sm_section_field = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;

      s.sm_field = true;
      s.sm_field_operator_in = true;
      s.sm_selection_operator = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      s.sm_indirect_field = true;
      s.sm_other_field = true;
      break;
    case ActionEnum.set_pindirect_exp:
    case ActionEnum.set_eindirect_exp:
      // sections
      s.sm_section_field = true;

      s.sm_field = true;
      s.sm_field_operator = true;
      s.sm_field_operator_in = true;
      s.sm_other_field = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      s.sm_indirect_field = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;
      break;
    default:
    // Just do nothing by default ...
  }

// case "set_remove":
//   $('#div_sm_field').show();
//   break;
// case "set_select_additionally":
// case "set_modify_by_value":
//   $('#divActionForm_Condition').show();
//   $('#div_sm_field').css('display', 'inline-block'); //Todo: inline-block not handled ...
//   $('#div_sm_fieldoperator').css('display', 'inline-block'); //Todo: inline-block not handled ...
//   $('#div_sm_fieldoperator_in').css('display', 'inline-block'); //Todo: inline-block not handled ...
//   $('#div_sm_selectionoperator').css('display', 'inline-block'); //Todo: inline-block not handled ...
//   $('#div_sm_value_1').css('display', 'inline-block'); //Todo: inline-block not handled ...
//
//   $('.lblValueExpression').text('Value(s)'); // Todo: ?
//   $('#tipValue_1').show(); // Todo: ?
//   $('#tipValue_2').show(); // Todo: ?
//   break;
// case "set_modify_by_expression":
//   $('#divActionForm_Condition').show();
//   $('#div_sm_field').css('display', 'inline-block');
//   $('#div_sm_fieldoperator').css('display', 'inline-block');
//   $('#div_sm_fieldoperator_in').css('display', 'inline-block');
//   $('#div_sm_selectionoperator').css('display', 'inline-block');
//   $('#div_sm_value_1').css('display', 'inline-block');
//   $('.lblValueExpression').text('Expression(s)'); // Todo: ?
//   $('#tipExpression_1').show();// Todo: ?
//   $('#tipExpression_2').show();// Todo: ?
//   break;
// case "set_pindirect":
// case "set_eindirect":
//   $('#divActionForm_Condition').show();
//   $('#div_sm_field').css('display', 'inline-block');
//   $('#div_sm_fieldoperator').css('display', 'inline-block');
//   $('#div_sm_fieldoperator_in').css('display', 'inline-block');
//   $('#div_sm_otherfield').css('display', 'inline-block');
//   $('#div_sm_selectionoperator').css('display', 'inline-block');
//   $('#div_sm_value_1').css('display', 'inline-block');
//   $('.lblValueExpression').text('Value(s)');// Todo: ?
//   $('#tipValue_1').show();// Todo: ?
//   $('#tipValue_2').show();// Todo: ?
//   $('#div_sm_indirectfield').css('display', 'inline-block');
//   break;
// case "set_pindirect_exp":
// case "set_eindirect_exp":
//   $('#divActionForm_Condition').show();
//   $('#div_sm_field').css('display', 'inline-block');
//   $('#div_sm_fieldoperator').css('display', 'inline-block');
//   $('#div_sm_fieldoperator_in').css('display', 'inline-block');
//   $('#div_sm_otherfield').css('display', 'inline-block');
//   $('#div_sm_selectionoperator').css('display', 'inline-block');
//   $('#div_sm_value_1').css('display', 'inline-block');
//   $('.lblValueExpression').text('Expression(s)'); // Todo
//   $('#tipExpression_1').show(); // Todo
//   $('#tipExpression_2').show(); // Todo
//   $('#div_sm_indirectfield').css('display', 'inline-block');

  return state;
}

interface SetModifierFormState {
  visibility: {
    sm_action: boolean;
    sm_field_operator: boolean;
    sm_field_operator_in: boolean;
    sm_field: boolean
    sm_other_field: boolean;
    sm_selection_operator: boolean;
    sm_value_1: boolean;
    sm_value_2: boolean;
    sm_indirect_field: boolean;
    sm_copy_other_field: boolean;
    sm_description: boolean;

    // sections
    sm_section_condition: boolean;
    sm_section_field: boolean;
    sm_section_preview: boolean;
  },
  // values: {
  //   sm_action: string;
  //   sm_field_operator: string;
  //   sm_field: string;
  //   sm_other_field: string;
  //   sm_selection_operator: string;
  //   sm_value_1: string;
  //   sm_value_2: string;
  //   sm_indirect_field: string;
  // },
  formState: ISetModifier
}

const initialState: SetModifierFormState = {
  visibility: {
    sm_action: true,
    sm_field_operator: false,
    sm_field_operator_in: false,
    sm_field: false,
    sm_other_field: false,
    sm_selection_operator: false,
    sm_value_1: false,
    sm_value_2: false,
    sm_indirect_field: false,
    sm_copy_other_field: false,
    sm_description: false,

    // sections
    sm_section_field: false,
    sm_section_condition: false,
    sm_section_preview: false,
  },
  // values: {
  //   sm_action: '',
  //   sm_field_operator: '',
  //   sm_field: '',
  //   sm_other_field: '',
  //   sm_selection_operator: '',
  //   sm_value_1: '',
  //   sm_value_2: '',
  //   sm_indirect_field: '',
  // },
  formState: setModifierInitialValues()
}

const calcExplanation = (state: SetModifierFormState) => {
  let sm = new SetModifier(state.formState);
  state.formState.Explanation = sm.getDescription();
  return state;
}

export const setModifierFormSlice = createSlice({
  name: 'modifier-modal',
  initialState,
  reducers: {
    initFormState: (state) => {
      state.formState = setModifierInitialValues();
      setActionVisibilityLogic(state, state.formState.Action);
      return state;
    },
    setFormState: (state, action: PayloadAction<ISetModifier>) => {
      state.formState = action.payload;
      setActionVisibilityLogic(state);
      return state;
    },
    setUUid: (state) => {
      state.formState.uid = uuidv4();
      return state;
    },
    setAction: (state: SetModifierFormState, action: PayloadAction<string | null>) => {
      let typedAction = action.payload as ActionEnum;
      state.formState.Action = typedAction;
      calcExplanation(state);
      setActionVisibilityLogic(state, typedAction);
      return state;
    },
    setField: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.Field = action.payload;
      calcExplanation(state);
      return state;
    },
    setFieldOperator: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.FieldOperator = action.payload;
      calcExplanation(state);
      return state;
    },
    setIndirectField: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.IndirectField = action.payload;
      calcExplanation(state);
      return state;
    },
    setOtherField: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.OtherField = action.payload;
      calcExplanation(state);
      return state;
    },
    setSelectionOperator: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.SelectionOperator = action.payload;
      calcExplanation(state);
      return state;
    },
    setValue1: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.ValuesOrExpression_1 = action.payload;
      calcExplanation(state);
      return state;
    },
    setValue2: (state: SetModifierFormState, action: PayloadAction<string>) => {
      state.formState.ValuesOrExpression_2 = action.payload;
      calcExplanation(state);
      return state;
    },
    resetFormSate: (state: SetModifierFormState) => {
      state.formState = setModifierInitialValues();
      return state;
    }
  }
});

export const {
  initFormState,
  resetFormSate,
  setAction,
  setField,
  setFieldOperator,
  setFormState,
  setIndirectField,
  setOtherField,
  setSelectionOperator,
  setValue1,
  setValue2
} = setModifierFormSlice.actions;
export default setModifierFormSlice.reducer;

// Selectors
export const selectFieldsVisibility = (state: RootState): SetModifierFormState['visibility'] => state.smForm.visibility;
export const selectSetModifier = (state: RootState): ISetModifier => state.smForm.formState;
