import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {IExampleGroup} from "./interfaces/IExampleGroup";
import {exampleGroups as EXAMPLES} from './examples';

interface ExamplesState {
  selectedGroup: string;
  selectedExample: string;
  groupItems: IExampleGroup[]
}

const initialState: ExamplesState = {
  selectedGroup: '',
  selectedExample: '',
  groupItems: EXAMPLES
}

export const examplesSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {}
});

export const {} = examplesSlice.actions;
export default examplesSlice.reducer;

// Selectors
export const selectGroupItems = (state: RootState): IExampleGroup[] => state.examples.groupItems;
