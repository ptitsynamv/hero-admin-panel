import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    heroAdding: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroAdded: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes.push(action.payload);
    },
    heroAddingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    heroDeleting: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroDeleted: (state, action) => {
      state.heroesLoadingStatus = 'idle';
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
    heroDeletingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroAdding,
  heroAdded,
  heroAddingError,
  heroDeleting,
  heroDeleted,
  heroDeletingError,
} = actions;
