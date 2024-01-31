import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { selectAllFilters, setActiveFilter } from './filtersSlice';

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const filters = useSelector(selectAllFilters);

  const onFilterSet = (title) => {
    dispatch(setActiveFilter(title));
  };

  const getOptions = (filters) => {
    return filters.map(({ id, title, color }) => {
      const btnClass = classNames({
        btn: true,
        [`btn-${color}`]: true,
        active: title === activeFilter,
      });

      return (
        <button
          key={id}
          className={btnClass}
          onClick={() => onFilterSet(title)}
        >
          {title}
        </button>
      );
    });
  };

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Error</h5>;
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Filter heroes by elements:</p>
        <div className="btn-group">{getOptions(filters)}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
