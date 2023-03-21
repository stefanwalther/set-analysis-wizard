import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {IExampleList} from "./interfaces/IExampleList";
import {exampleGroups as EXAMPLES} from './examples';

interface ExamplesState {
  selectedListKey: string;
  selectedItemKey: string;
  listItems: IExampleList[]
}

const initialState: ExamplesState = {
  selectedListKey: 'basic-simple',
  selectedItemKey: '',
  listItems: EXAMPLES
}

export const examplesSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedList: (state: ExamplesState, action: PayloadAction<string>) => {
      state.selectedListKey = action.payload;
    },
  }
});

export const {
  setSelectedList
} = examplesSlice.actions;
export default examplesSlice.reducer;

// Selectors
export const selectExampleList = (state: RootState): IExampleList[] => state.examples.listItems;
export const selectedSelectedList = (state: RootState): string => state.examples.selectedListKey;
export const selectedItemKey = (state: RootState): string => state.examples.selectedItemKey;
export const selectSelectedItems = (state: RootState): IExampleList | undefined => {
  let list = state.examples.listItems.find((item: IExampleList) => item.key === state.examples.selectedListKey);
  if (list) {
    return list;
  }
}
