import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {ISetIdentifierGroup, setModifierInitialValues} from "../../common/interfaces";
import {ISetModifier} from "../../common/interfaces";
import {ISetAnalysisDefinitionProps} from "./interfaces/ISetAnalysisDefinitionProps";

interface WizardState {
  currentWizardStep: number;
  modifierModalOpen: boolean;
  selectedSetIdentifier?: ISetIdentifierGroup;
  value: ISetAnalysisDefinitionProps
}

const initialState: WizardState = {
  currentWizardStep: 1,
  modifierModalOpen: false,
  selectedSetIdentifier: undefined,
  // currentSetModifierFormValue: setModifierInitialValues,
  value: {
    FieldExpression: "",
    SetIdentifier: "",
    AggregationType: "",
    SetModifiers: []
  }
}

export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    getWizardState: (state: WizardState) => {
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
    },
    saveSetModifier: (state: WizardState, action: PayloadAction<ISetModifier>) => {

      let id = action.payload.uid;

      if (state.value.SetModifiers.find((item) => item.uid === id)) {
        state.value.SetModifiers = state.value.SetModifiers.map((item) => {
          if (item.uid === id) {
            return Object.assign({}, action.payload);
          }
          return item;
        })
      } else {
        state.value.SetModifiers?.push(Object.assign({}, action.payload));
      }
      return state;
    },
    resetModifiers: (state: WizardState) => {
      state.value.SetModifiers = [];
      return state;
    },
    deleteModifier: (state: WizardState, action: PayloadAction<number>) => {
      state.value.SetModifiers.splice(action.payload, 1);
      return state;
    }
  }
});

export const {
  deleteModifier,
  getWizardState,
  resetModifiers,
  setCurrentWizardStep,
  saveSetModifier,
  setModifierModalVisibility,
  setValueSetIdentifier,
  setValueAggregationType,
  setValueFieldExpression,
  setValuePersonalComment

} = wizardSlice.actions;
export default wizardSlice.reducer;

// General
export const selectSerializedState = (state: RootState): string => {
  return JSON.stringify(state.wizard);
}

// UI related selectors
export const selectCurrentWizardStep = (state: RootState): number => state.wizard.currentWizardStep;
export const selectIsModifierModalOpen = (state: RootState): boolean => state.wizard.modifierModalOpen;
export const selectWizardValue = (state: RootState): ISetAnalysisDefinitionProps => state.wizard.value;

// Values & Set Values
export const selectSetModifiers = (state: RootState): ISetModifier[] => state.wizard.value.SetModifiers;
export const selectValueSetIdentifier = (state: RootState): string => state.wizard.value.SetIdentifier;
export const selectValueAggregationType = (state: RootState): string => state.wizard.value.AggregationType;
export const selectValueFieldExpression = (state: RootState): string => state.wizard.value.FieldExpression;
export const selectValuePersonalComment = (state: RootState): string => state.wizard.value.PersonalComment ?? '';
