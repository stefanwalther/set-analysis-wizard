import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {ISetIdentifierGroup} from "../../common/interfaces";
import {ISetModifier} from "../../common/interfaces";
import {ISetAnalysisDefinitionProps} from "./interfaces/ISetAnalysisDefinitionProps";
import {SetAnalysisEngine} from "../../common/models/SetAnalysisEngine";
import { v4 as uuidv4 } from 'uuid';
import {nullOrEmpty} from "../../common/utils";

interface WizardState {
  currentWizardStep: number;
  highlightedSetModifier: string;
  modifierModalOpen: boolean;
  selectedSetIdentifier?: ISetIdentifierGroup; // Todo: probably needs to be deleted ...
  value: ISetAnalysisDefinitionProps
}

const initialState: WizardState = {
  currentWizardStep: 1,
  highlightedSetModifier: '',
  modifierModalOpen: false,
  selectedSetIdentifier: undefined,
  value: {
    FieldExpression: "",
    SetIdentifier: "",
    AggregationType: "",
    SetModifiers: []
  }
}

const calcExpression = (props: ISetAnalysisDefinitionProps): string => {
  let engine = new SetAnalysisEngine(props);
  engine.Calculate();
  return engine.Expression;
}

interface IResult {
  Expression: string;
  ExpressionWithComments: string;
}

const calcResult = (props: ISetAnalysisDefinitionProps): IResult => {
  let engine = new SetAnalysisEngine(props);
  engine.Calculate();
  return {
    Expression: engine.Expression,
    ExpressionWithComments: engine.PureDescription || ""
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
    },
    setHighlightedSetModifier: (state: WizardState, action: PayloadAction<string>) => {
      state.highlightedSetModifier = action.payload;
    },
    setModifierModalVisibility: (state: WizardState, action: PayloadAction<boolean>) => {
      state.modifierModalOpen = action.payload;
    },
    setValueSetIdentifier: (state: WizardState, action: PayloadAction<string>) => {
      state.value.SetIdentifier = action.payload;
      state.value.Expression = calcResult(state.value).Expression;
      state.value.ExpressionWithComments = calcResult(state.value).ExpressionWithComments;
    },
    setValueAggregationType: (state: WizardState, action: PayloadAction<string>) => {
      state.value.AggregationType = action.payload;
      state.value.Expression = calcExpression(state.value);
    },
    setValueFieldExpression: (state: WizardState, action: PayloadAction<string>) => {
      state.value.FieldExpression = action.payload;
      state.value.Expression = calcExpression(state.value);
    },
    setValuePersonalComment: (state: WizardState, action: PayloadAction<string>) => {
      state.value.PersonalComment = action.payload;
      state.value.Expression = calcExpression(state.value);
    },
    saveSetModifier: (state: WizardState, action: PayloadAction<ISetModifier>) => {

      let uid = action.payload.uid;

      if (state.value.SetModifiers.find((item) => item.uid === uid)) {
        state.value.SetModifiers = state.value.SetModifiers.map((item) => {
          if (item.uid === uid) {
            return Object.assign({}, action.payload);
          }
          return item;
        })
      } else {
        let newSetModifier = Object.assign({}, action.payload);
        if (nullOrEmpty(newSetModifier.uid)) {
          newSetModifier.uid = uuidv4()
        }
        state.value.SetModifiers?.push(newSetModifier);
      }
      state.value.Expression = calcExpression(state.value);
    },
    resetModifiers: (state: WizardState) => {
      state.value.SetModifiers = [];
      state.value.Expression = calcExpression(state.value);
    },
    deleteModifier: (state: WizardState, action: PayloadAction<number>) => {
      state.value.SetModifiers.splice(action.payload, 1);
      state.value.Expression = calcExpression(state.value);
    }
  }
});

export const {
  deleteModifier,
  getWizardState,
  resetModifiers,
  setCurrentWizardStep,
  setHighlightedSetModifier,
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
export const selectHighlightedSetModifier = (state: RootState): string => state.wizard.highlightedSetModifier;
export const selectIsModifierModalOpen = (state: RootState): boolean => state.wizard.modifierModalOpen;
export const selectWizardValue = (state: RootState): ISetAnalysisDefinitionProps => state.wizard.value;

// Values & Set Values
export const selectSetModifiers = (state: RootState): ISetModifier[] => state.wizard.value.SetModifiers;
export const selectValueSetIdentifier = (state: RootState): string => state.wizard.value.SetIdentifier;
export const selectValueAggregationType = (state: RootState): string => state.wizard.value.AggregationType;
export const selectValueFieldExpression = (state: RootState): string => state.wizard.value.FieldExpression;
export const selectValuePersonalComment = (state: RootState): string => state.wizard.value.PersonalComment ?? '';
