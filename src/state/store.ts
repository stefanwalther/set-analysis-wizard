import {configureStore} from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice';
import examplesReducer from '../features/examples/examplesSlice';
import wizardReducer from '../features/wizard/wizardSlice';

export const store = configureStore({
  reducer: {
    examples: examplesReducer,
    ui: uiReducer,
    wizard: wizardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
