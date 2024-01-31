import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

const HeroesList = () => {
  const {
    data: heroes = [],
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHeroesQuery();
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const filteredHeroes = useMemo(() => {
    const filtered = [...heroes];

    if (activeFilter === 'all') {
      return filtered;
    }
    return filtered.filter((hero) => hero.element === activeFilter);
  }, [heroes, activeFilter]);

  const onDeleteHero = useCallback((id) => {
    deleteHero(id);
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
