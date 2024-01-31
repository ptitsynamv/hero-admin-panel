import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import {
  fetchHeroes,
  heroDeleted,
  heroDeleting,
  heroDeletingError,
} from './heroesSlice';

const HeroesList = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (activeFilter, heroes) => {
      if (activeFilter === 'all') {
        return heroes;
      }
      return heroes.filter((hero) => hero.element === activeFilter);
    }
  );
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  const onDeleteHero = useCallback(
    (id) => {
      dispatch(heroDeleting(id));
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => dispatch(heroDeleted(id)))
        .catch(() => dispatch(heroDeletingError()));
    },
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Error</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Empty</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          key={id}
          {...props}
          onDeleteHero={() => onDeleteHero(id)}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
