const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
    case 'HERO_DELETING':
    case 'HERO_ADDING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHING_ERROR':
    case 'HERO_DELETING_ERROR':
    case 'HERO_ADDING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };

    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };

    case 'HERO_DELETED':
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
        heroesLoadingStatus: 'idle',
      };

    case 'HERO_ADDED':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
        heroesLoadingStatus: 'idle',
      };

    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'SET_ACTIVE_FILTER':
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
