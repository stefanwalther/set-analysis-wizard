import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {
  IAggregationTypeGroup,
  IFieldOperator,
  ISetIdentifierGroup,
  ISetModifierActionGroup
} from "../../common/interfaces";
import {FIELD_OPERATORS} from "./data";
import {SET_MODIFIER_ACTION_GROUPS} from "./data";
import {SET_IDENTIFIER_GROUPS} from "./data";
import {AGGREGATION_TYPE_GROUPS} from "./data";
import {ISelectionOperator} from "../../common/interfaces/ISelectionOperator";
import {SELECTION_OPERATORS} from "./data/selection-operators";

interface ResourcesState {
  aggregationTypeGroups: IAggregationTypeGroup[],
  fieldOperators: IFieldOperator[],
  selectionOperators: ISelectionOperator[],
  setIdentifierGroups: ISetIdentifierGroup[];
  setModifierActionGroups: ISetModifierActionGroup[],
}

const initialState: ResourcesState = {
  aggregationTypeGroups: AGGREGATION_TYPE_GROUPS,
  fieldOperators: FIELD_OPERATORS,
  selectionOperators: SELECTION_OPERATORS,
  setIdentifierGroups: SET_IDENTIFIER_GROUPS,
  setModifierActionGroups: SET_MODIFIER_ACTION_GROUPS,
}

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    getUiState: (state: ResourcesState) => {
      return state;
    }
  }
});

export const {getUiState} = resourcesSlice.actions;
export default resourcesSlice.reducer;

// Selectors
export const selectAggregationTypeGroups = (state: RootState): IAggregationTypeGroup[] => state.resources.aggregationTypeGroups;
export const selectFieldOperators = (state: RootState): IFieldOperator[] => state.resources.fieldOperators;
export const selectSelectionOperators = (state: RootState): ISelectionOperator[] => state.resources.selectionOperators;
export const selectSetIdentifierGroups = (state: RootState): ISetIdentifierGroup[] => state.resources.setIdentifierGroups;
export const selectSetModifierActionGroups = (state: RootState): ISetModifierActionGroup[] => state.resources.setModifierActionGroups;
