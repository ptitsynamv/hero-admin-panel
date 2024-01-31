export const heroesFetching = () => {
  return {
    type: 'HEROES_FETCHING',
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: 'HEROES_FETCHED',
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR',
  };
};

/** Delete */

export const heroDeleting = (id) => {
  return {
    type: 'HERO_DELETING',
    payload: id,
  };
};

export const heroDeleted = (id) => {
  return {
    type: 'HERO_DELETED',
    payload: id,
  };
};

export const heroDeletingError = () => {
  return {
    type: 'HERO_DELETING_ERROR',
  };
};

/** Add */

export const heroAdding = (hero) => {
  return {
    type: 'HERO_ADDING',
    payload: hero,
  };
};

export const heroAdded = (hero) => {
  return {
    type: 'HERO_ADDED',
    payload: hero,
  };
};

export const heroAddingError = () => {
  return {
    type: 'HERO_ADDING_ERROR',
  };
};

/** Filters */

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING',
  };
};

export const filtersFetched = (filters) => {
  return {
    type: 'FILTERS_FETCHED',
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR',
  };
};

export const setActiveFilter = (filter) => {
  return {
    type: 'SET_ACTIVE_FILTER',
    payload: filter,
  };
};
