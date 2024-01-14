import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Film, Person, Specie, Starship, StatusType } from "../types/types";
import { fetchList, getPersonAPI } from "../api/api";
import { RootState } from "./store";

type SelectedPersonSlice = {
  personData: Person | undefined;
  filmsData: Film[];
  starShipsData: Starship[];
  speciesData: Specie[];
  status: {
    character: StatusType;
    films: StatusType;
    species: StatusType;
    starships: StatusType;
  };
};

const defaultStatus = {
  character: StatusType.Loading,
  films: StatusType.Loading,
  species: StatusType.Loading,
  starships: StatusType.Loading,
};

export const initialState: SelectedPersonSlice = {
  personData: undefined,
  filmsData: [],
  starShipsData: [],
  speciesData: [],
  status: defaultStatus,
};

export const getPerson = createAsyncThunk(
  "person/getPerson",
  async (id: number, { rejectWithValue, dispatch }) => {
    const res = await getPersonAPI(id);
    if (res.status === 200) {
      const data = (await res.json()) as Person;

      dispatch(getCharacterFilms(data.films));
      dispatch(getCharacterSpecies(data.species));
      dispatch(getCharacterStarships(data.starships));

      return data;
    } else {
      return rejectWithValue("Error");
    }
  },
);

export const getCharacterFilms = createAsyncThunk(
  "person/getCharacterFilms",
  fetchList<Film>,
);
export const getCharacterSpecies = createAsyncThunk(
  "person/getCharacterSpecies",
  fetchList<Specie>,
);
export const getCharacterStarships = createAsyncThunk(
  "person/getCharacterStarships",
  fetchList<Starship>,
);

export const selectedPersonSlice = createSlice({
  name: "selectedPerson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPerson.pending, (state) => {
        state.status = defaultStatus;
        state.filmsData = [];
        state.speciesData = [];
        state.starShipsData = [];
      })
      .addCase(getPerson.fulfilled, (state, action) => {
        state.status.character = StatusType.Success;
        state.personData = action.payload;
      })
      .addCase(getPerson.rejected, (state) => {
        state.status.character = StatusType.Error;
      });

    builder
      .addCase(getCharacterFilms.pending, (state) => {
        state.status.films = StatusType.Loading;
      })
      .addCase(getCharacterFilms.fulfilled, (state, action) => {
        state.status.films = StatusType.Success;
        state.filmsData = action.payload;
      })
      .addCase(getCharacterFilms.rejected, (state) => {
        state.status.films = StatusType.Error;
      });

    builder
      .addCase(getCharacterSpecies.pending, (state) => {
        state.status.species = StatusType.Loading;
      })
      .addCase(getCharacterSpecies.fulfilled, (state, action) => {
        state.status.species = StatusType.Success;
        state.speciesData = action.payload;
      })
      .addCase(getCharacterSpecies.rejected, (state) => {
        state.status.species = StatusType.Error;
      });

    builder
      .addCase(getCharacterStarships.pending, (state) => {
        state.status.starships = StatusType.Loading;
      })
      .addCase(getCharacterStarships.fulfilled, (state, action) => {
        state.status.starships = StatusType.Success;
        state.starShipsData = action.payload;
      })
      .addCase(getCharacterStarships.rejected, (state) => {
        state.status.starships = StatusType.Error;
      });
  },
});

export const getStatus = (state: RootState) => state.selectedPerson.status;
export const getPersonData = (state: RootState) => state.selectedPerson.personData;
export const getPersonFilms = (state: RootState) => state.selectedPerson.filmsData;
export const getPersonSpecies = (state: RootState) => state.selectedPerson.speciesData;
export const getPersonStarships = (state: RootState) => state.selectedPerson.starShipsData;

export default selectedPersonSlice.reducer;
