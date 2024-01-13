import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ErrorType, Film, StatusType } from "../types/types";
import { getFilmsAPI } from "../api/api";
import { cycleFetch } from "./helpers";

type FilmsSlice = {
  films: Film[],
  status: StatusType,
  error: ErrorType
}

export const initialState: FilmsSlice = {
  films: [],
  status: StatusType.Success,
  error: ErrorType.NoError,
};

export const getFilmsThunk = createAsyncThunk(
  "films/getFilms",
  async (_, {rejectWithValue, dispatch}) => {
    await cycleFetch<Film>(
      getFilmsAPI,
      setFilms,
      dispatch,
      () => rejectWithValue("Error"),
    );
  }
);

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms: (state, action: PayloadAction<Film[]>) => {
      if (action.payload) {
        state.films = [...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilmsThunk.pending, (state) => {
        state.status = StatusType.Loading;
      })
      .addCase(getFilmsThunk.fulfilled, (state) => {
        state.status = StatusType.Success;
      })
      .addCase(getFilmsThunk.rejected, (state) => {
        state.status = StatusType.Error;
        state.error = ErrorType.ServerProblem;
      });
  },
});

export const getFilms = (state: RootState) => state.films.films;

export const {setFilms} = filmsSlice.actions;
export default filmsSlice.reducer;