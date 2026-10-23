import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../state";
import {Environment} from "../../common/enums/Environment";

interface UIState {
  /**
   * Indicates that the application is loading
   */
  appLoading: boolean,
  isSettingsDrawerOpen: boolean,
  environment: Environment
}

const initialState: UIState = {
  appLoading: false,
  isSettingsDrawerOpen: false,
  environment: process.env.NODE_ENV as Environment
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

// selectors
export const selectIsSettingDrawerOpen = (state: RootState): boolean => state.ui.isSettingsDrawerOpen;
export const selectEnvironment = (state: RootState): string => state.ui.environment;
