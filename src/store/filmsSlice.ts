import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Film, StatusType } from "../types/types";
import { getFilmsAPI } from "../api/api";
import { cycleFetch } from "./helpers";

type FilmsSlice = {
  films: Film[],
  status: StatusType,
}

export const initialState: FilmsSlice = {
  films: [],
  status: StatusType.Success,
};

export const getFilmsThunk = createAsyncThunk(
  "films/getFilms",
  async (_, {rejectWithValue, dispatch}) => {
    return await cycleFetch<Film>(
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
      });
  },
});

export const getFilms = (state: RootState) => state.films.films;

export const {setFilms} = filmsSlice.actions;
export default filmsSlice.reducer;