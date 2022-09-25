import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";

interface UIState {
  isSettingsDrawerOpen: boolean,
}

const initialState: UIState = {
  isSettingsDrawerOpen: false

}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    getUiState: (state:UIState) => {
      return state
    },
    setSettingsDrawerVisibility: (state: UIState, action: PayloadAction<boolean>) => {
      state.isSettingsDrawerOpen = action.payload;
      return state;
    },

  }
});

export const {getUiState,setSettingsDrawerVisibility} = uiSlice.actions;
export default uiSlice.reducer;

export const selectIsSettingDrawerOpen = (state: RootState): boolean => state.ui.isSettingsDrawerOpen;
