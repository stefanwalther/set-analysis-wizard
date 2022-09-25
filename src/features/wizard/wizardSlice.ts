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
  name: 'wizard',
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
    setValueSetIdentifier: (state: WizardState, action: PayloadAction<string>) => {
      state.value.SetIdentifier = action.payload;
      return state;
    },
    setValueAggregationType: (state: WizardState, action: PayloadAction<string>) => {
      state.value.AggregationType = action.payload;
      return state;
    },
    setValueFieldExpression: (state: WizardState, action: PayloadAction<string>) => {
      state.value.FieldExpression = action.payload;
      return state;
    },
    setValuePersonalComment: (state: WizardState, action: PayloadAction<string>) => {
      state.value.PersonalComment = action.payload;
      return state;
    }

  }
});

export const {
  getWizardState,
  setCurrentWizardStep,
  getInitialSetIdentifierGroups,
  getInitialAggregationTypeGroups,

  setValueSetIdentifier,
  setValueAggregationType,
  setValueFieldExpression,
  setValuePersonalComment

} = wizardSlice.actions;
export default wizardSlice.reducer;

export const selectCurrentWizardStep = (state: RootState): number => state.wizard.currentWizardStep;
export const selectSetIdentifierGroups = (state: RootState): ISetIdentifierGroup[] => state.wizard.setIdentifierGroups;
export const selectAggregationTypeGroups = (state: RootState): IAggregationTypeGroup[] => state.wizard.aggregationTypeGroups;
export const selectWizardValue = (state: RootState): IWizardValue => state.wizard.value;

// Values & Set Values
export const selectValueSetIdentifier = (state: RootState): string => state.wizard.value.SetIdentifier;
export const selectValueAggregationType = (state: RootState): string => state.wizard.value.AggregationType;
export const selectValueFieldExpression = (state: RootState): string => state.wizard.value.FieldExpression;
export const selectValuePersonalComment = (state: RootState): string => state.wizard.value.PersonalComment ?? '';
