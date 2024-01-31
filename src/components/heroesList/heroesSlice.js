import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const { request } = useHttp();
  return await request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroAdding: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroAdded: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      heroesAdapter.addOne(state, action.payload);
    },
    heroAddingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    heroDeleting: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroDeleted: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      heroesAdapter.removeOne(state, action.payload);
    },
    heroDeletingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (activeFilter, heroes) => {
    if (activeFilter === 'all') {
      return heroes;
    }
    return heroes.filter((hero) => hero.element === activeFilter);
  }
);

export const {
  heroAdding,
  heroAdded,
  heroAddingError,
  heroDeleting,
  heroDeleted,
  heroDeletingError,
} = actions;

export default reducer;
