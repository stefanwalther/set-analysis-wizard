import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";

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
    sm_action: false,
    sm_field_operator: false,
    sm_field_operator_in: false,
    sm_field: false,
    sm_other_field: false,
    sm_selection_operator: false,
    sm_value_1: false,
    sm_value_2: false,
    sm_indirect_field: false,
    sm_copy_other_field: false,
    sm_description: false
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
  reducers: {}
});

export const {} = setModifierFormSlice.actions;
export default setModifierFormSlice.reducer;

// Selectors
export const selectFieldsVisibility = (state: RootState): SetModifierFormState['visibility'] => state.smForm.visibility;
