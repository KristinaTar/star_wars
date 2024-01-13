import { createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { ErrorType, Film, Person, Specie, Starship, StatusType } from "../types/types";
import { fetchList, getPersonAPI } from "../api/api";
import { RootState } from "./store";

type SelectedPersonSlice = {
  personData: Person | undefined,
  filmsData: Film[],
  starShipsData: Starship[],
  speciesData: Specie[],
  error: ErrorType
  status: {
    character: StatusType,
    films: StatusType,
    species: StatusType,
    starships: StatusType,
  },
}

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
  error: ErrorType.NoError,
  status: defaultStatus,
};

export const getPerson = createAsyncThunk(
  "person/getPerson",
  async (id: number, {rejectWithValue, dispatch}) => {
    const res = await getPersonAPI(id);
    if (res.status === 200) {
      const data = (await res.json()) as Person;

      dispatch(setPerson(data));
      dispatch(getCharacterFilms(data.films));
      dispatch(getCharacterSpecies(data.species));
      dispatch(getCharacterStarships(data.starships));

      return data;
    } else {
      return rejectWithValue("Error");
    }
  }
);

export const getCharacterFilms = createAsyncThunk(
  "person/getCharacterFilms",
  fetchList<Film>
);
export const getCharacterSpecies = createAsyncThunk(
  "person/getCharacterSpecies",
  fetchList<Specie>
);
export const getCharacterStarships = createAsyncThunk(
  "person/getCharacterStarships",
  fetchList<Starship>
);

export const selectedPersonSlice = createSlice({
  name: "selectedPerson",
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<Person>) => {
      if (action.payload) {
        state.personData = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPerson.pending, (state, action) => {
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
        state.error = ErrorType.ServerProblem;
      });

    builder
      .addCase(getCharacterFilms.pending, (state, action) => {
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
      .addCase(getCharacterSpecies.pending, (state, action) => {
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
      .addCase(getCharacterStarships.pending, (state, action) => {
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
export const getPersonData = (state: RootState) => ({
  data: state.selectedPerson.personData,
  films: state.selectedPerson.filmsData,
  species: state.selectedPerson.speciesData,
  starships: state.selectedPerson.starShipsData,
});

export const {setPerson} = selectedPersonSlice.actions;

export default selectedPersonSlice.reducer;