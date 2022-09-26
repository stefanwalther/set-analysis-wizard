import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {InitialWizardValue, IWizardValue} from "./interfaces/IWizardValue";
import {ISetIdentifierGroup} from "../../common/interfaces";

interface WizardState {
  currentWizardStep: number;
  modifierModalOpen: boolean;
  selectedSetIdentifier?: ISetIdentifierGroup;
  value: IWizardValue;
}

const initialState: WizardState = {
  currentWizardStep: 1,
  modifierModalOpen: false,
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
    setCurrentWizardStep: (state: WizardState, action: PayloadAction<number>) => {
      state.currentWizardStep = action.payload;
      return state;
    },
    setModifierModalVisibility: (state: WizardState, action: PayloadAction<boolean>) => {
      state.modifierModalOpen = action.payload;
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
  setModifierModalVisibility,
  setValueSetIdentifier,
  setValueAggregationType,
  setValueFieldExpression,
  setValuePersonalComment

} = wizardSlice.actions;
export default wizardSlice.reducer;

// UI related selectors
export const selectCurrentWizardStep = (state: RootState): number => state.wizard.currentWizardStep;
export const selectIsModifierModalOpen = (state: RootState): boolean => state.wizard.modifierModalOpen;
export const selectWizardValue = (state: RootState): IWizardValue => state.wizard.value;

// Values & Set Values
export const selectValueSetIdentifier = (state: RootState): string => state.wizard.value.SetIdentifier;
export const selectValueAggregationType = (state: RootState): string => state.wizard.value.AggregationType;
export const selectValueFieldExpression = (state: RootState): string => state.wizard.value.FieldExpression;
export const selectValuePersonalComment = (state: RootState): string => state.wizard.value.PersonalComment ?? '';
