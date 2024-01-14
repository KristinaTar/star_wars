import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Person, StatusType } from "../types/types";
import { getPeopleAPI } from "../api/api";
import { cycleFetch } from "./helpers";

type PeopleSlice = {
  people: Person[],
  status: StatusType,
}

export const initialState: PeopleSlice = {
  people: [],
  status: StatusType.Success,
};

export const getPeopleThunk = createAsyncThunk(
  "people/getPeople",
  async (_, {rejectWithValue, dispatch}) => {
    return await cycleFetch<Person>(
      getPeopleAPI,
      setPeople,
      dispatch,
      () => rejectWithValue("Error"),
    );
  }
);

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<Person[]>) => {
      if (action.payload) {
        state.people = [...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeopleThunk.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(getPeopleThunk.fulfilled, (state) => {
        state.status = StatusType.Success;
      })
      .addCase(getPeopleThunk.rejected, (state) => {
        state.status = StatusType.Error;
      });
  },
});

export const getPeople = (state: RootState) => state.people.people;
export const setStatus = (state: RootState) => state.people.status;

export const {setPeople} = peopleSlice.actions;
export default peopleSlice.reducer;