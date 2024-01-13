import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { ErrorType, Person, StatusType } from "../types/types";
import { getPersonAPI } from "../api/api";
import { RootState } from "./store";

type SelectedPersonSlice = {
  personData: Person | undefined,
  error: ErrorType
  status: StatusType,
}

export const initialState: SelectedPersonSlice = {
  personData: undefined,
  error: ErrorType.NoError,
  status: StatusType.Success,
};

export const getPerson = createAsyncThunk(
  "person/getPerson",
  async (id: number, {rejectWithValue, dispatch}) => {
    const res = await getPersonAPI(id);
    if (res.status === 200) {
      const data = (await res.json()) as Person;
      if (data.detail === "Not found") {
        return rejectWithValue("Not found");
      }

      return data;
    } else {
      return rejectWithValue("Error");
    }
  }
);

export const selectedPersonSlice = createSlice({
  name: "selectedPerson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerson.pending, (state, action) => {
        state.status = StatusType.Loading;
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.status = StatusType.Success;
        state.personData = action.payload;
      })
      .addCase(getPerson.rejected, (state) => {
        state.status = StatusType.Error;
        state.error = ErrorType.ServerProblem;
      });
  },
});

export const getStatus = (state: RootState) => state.selectedPerson.status;
export const getPersonData = (state: RootState) => state.selectedPerson.personData;

export default selectedPersonSlice.reducer;