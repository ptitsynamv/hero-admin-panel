import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleting,
  heroDeleted,
  heroDeletingError,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
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

  const filteredHeroes =
    activeFilter === 'all'
      ? heroes
      : heroes.filter((hero) => hero.element === activeFilter);

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
