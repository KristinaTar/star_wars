import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Person } from "../types/types";
import { getPeopleAPI } from "../api/api";
import { cycleFetch } from "./helpers";

type PeopleSlice = {
  people: Person[],
  error: ErrorType
}

enum ErrorType { NoError, ServerProblem }

export const initialState: PeopleSlice = {
  people: [],
  error: ErrorType.NoError,
};

export const getPeopleThunk = createAsyncThunk(
  "weather/getWeatherForCities",
  async (_, {rejectWithValue, dispatch}) => {
    await cycleFetch<Person>(
      getPeopleAPI,
      addPeople,
      dispatch,
      () => rejectWithValue("Error"),
    );
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPeople: (state, action: PayloadAction<Person[]>) => {
      if (action.payload) {
        state.people = [...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeopleThunk.rejected, (state) => {
        state.error = ErrorType.ServerProblem;
      });
  },
});

export const getPeople = (state: RootState) => state.people.people;

export const {addPeople} = peopleSlice.actions;
export default peopleSlice.reducer;