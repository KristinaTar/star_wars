import { configureStore } from '@reduxjs/toolkit'
import filmsReducer from "./filmsSlice";
import peopleReducer from "./peopleSlice";
import selectedPersonReducer from "./selectedPersonSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    films: filmsReducer,
    selectedPerson: selectedPersonReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch