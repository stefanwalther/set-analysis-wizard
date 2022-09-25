import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../state";

interface ExamplesState {
  selectedGroup: string;
  selectedExample: string;
}

const initialState: ExamplesState = {
  selectedGroup: '',
  selectedExample: ''
}

export const examplesSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
  }
});

export const {} = examplesSlice.actions;
export default examplesSlice.reducer;
