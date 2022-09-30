import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {ActionEnum} from "./enums/ActionEnum";

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

const setActionLogic = (state: SetModifierFormState, action: ActionEnum): SetModifierFormState => {

  let s = state.visibility;

  state = setAllInvisible(state);

  switch (action) {
    case ActionEnum.set_remove:
      s.sm_field = true;
      s.sm_section_field = true;
      s.sm_section_preview = true;
      break;
    case ActionEnum.set_select_additionally:
    case ActionEnum.set_modify_by_value:
      s.sm_field = true;
      s.sm_field_operator = true;
      s.sm_field_operator_in = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;
      break;
    case ActionEnum.set_modify_by_expression:
      s.sm_field = true;
      s.sm_field_operator = true;
      s.sm_field_operator_in = true;
      s.sm_field_operator = true;
      s.sm_value_1 = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;
      break;
    case ActionEnum.set_pindirect:
    case ActionEnum.set_eindirect:
      s.sm_field = true;
      s.sm_field_operator_in = true;
      s.sm_selection_operator = true;
      s.sm_selection_operator = true;
      s.sm_value_1 = true;
      s.sm_indirect_field = true;
      s.sm_section_condition = true;
      s.sm_section_preview = true;
      break;
    case ActionEnum.set_pindirect_exp:
    case ActionEnum.set_eindirect_exp:
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
  values: {
    sm_action: string;
    sm_field_operator: string;
    sm_field: string;
    sm_other_field: string;
    sm_selection_operator: string;
    sm_value_1: string;
    sm_value_2: string;
    sm_indirect_field: string;
  }
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
    sm_section_condition: false,
    sm_section_field: false,
    sm_section_preview: false,
  },
  values: {
    sm_action: '',
    sm_field_operator: '',
    sm_field: '',
    sm_other_field: '',
    sm_selection_operator: '',
    sm_value_1: '',
    sm_value_2: '',
    sm_indirect_field: '',
  }
}


export const setModifierFormSlice = createSlice({
  name: 'modifier-modal',
  initialState,
  reducers: {
    setAction: (state: SetModifierFormState, action: PayloadAction<string | null>) => {
      let typedAction = action.payload as ActionEnum
      setActionLogic(state, typedAction);
      return state;
    }
  }
});

export const {setAction} = setModifierFormSlice.actions;
export default setModifierFormSlice.reducer;

// Selectors
export const selectFieldsVisibility = (state: RootState): SetModifierFormState['visibility'] => state.smForm.visibility;
