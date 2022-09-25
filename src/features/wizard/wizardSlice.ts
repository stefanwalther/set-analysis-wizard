import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {ISetIdentifierGroup} from "./interfaces/ISetIdentiferGroup";
import {SetIdentifierGroups} from "./fixtures/set-identifer-groups";
import {AggregationTypeGroups} from "./fixtures/aggregation-type-groups";
import {IAggregationTypeGroup} from "./interfaces/IAggregationTypeGroup";
import {InitialWizardValue, IWizardValue} from "./interfaces/IWizardValue";

interface WizardState {
  currentWizardStep: number;
  setIdentifierGroups: ISetIdentifierGroup[];
  aggregationTypeGroups: IAggregationTypeGroup[]
  selectedSetIdentifier?: ISetIdentifierGroup;
  value: IWizardValue;
}

const initialState: WizardState = {
  currentWizardStep: 1,
  setIdentifierGroups: [],
  aggregationTypeGroups: [],
  selectedSetIdentifier: undefined,
  value: InitialWizardValue
}

export const wizardSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    getWizardState: (state:WizardState) => {
      return state
    },
    getInitialSetIdentifierGroups: (state: WizardState) => {
      state.setIdentifierGroups = SetIdentifierGroups;
      return state;
    },
    getInitialAggregationTypeGroups: (state:WizardState) => {
      state.aggregationTypeGroups = AggregationTypeGroups;
      return state;
    },
    setCurrentWizardStep: (state: WizardState, action: PayloadAction<number>) => {
      state.currentWizardStep = action.payload;
      return state;
    },

  }
});

export const {getWizardState,setCurrentWizardStep, getInitialSetIdentifierGroups, getInitialAggregationTypeGroups} = wizardSlice.actions;
export default wizardSlice.reducer;

export const selectCurrentWizardStep = (state: RootState): number => state.wizard.currentWizardStep;
export const selectSetIdentifierGroups = (state: RootState): ISetIdentifierGroup[] => state.wizard.setIdentifierGroups;
export const selectAggregationTypeGroups = (state: RootState): IAggregationTypeGroup[] => state.wizard.aggregationTypeGroups;
