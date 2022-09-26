import {configureStore} from '@reduxjs/toolkit'
import examplesReducer from '../features/examples/examplesSlice';
import setModifierFormReducer from '../features/set-modifier-form/setModifierFormSlice';
import resourcesReducer from '../features/resources/resourcesSlice';
import uiReducer from '../features/ui/uiSlice';
import wizardReducer from '../features/wizard/wizardSlice';

const initialState = {
}

export const store = configureStore({
  reducer: {
    examples: examplesReducer,
    smForm: setModifierFormReducer,
    resources: resourcesReducer,
    ui: uiReducer,
    wizard: wizardReducer
  },
  preloadedState: initialState
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
