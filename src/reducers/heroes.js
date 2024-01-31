const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroes = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default heroes;
