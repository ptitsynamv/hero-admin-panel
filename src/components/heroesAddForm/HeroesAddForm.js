import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fetchFilters } from '../../actions';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { heroAdded, heroAdding, heroAddingError } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  const getOptions = (filters) => {
    return filters.map(({ id, title }) => {
      return (
        <option key={id} value={title}>
          {title}
        </option>
      );
    });
  };

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        element: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name is required')
          .min(2, 'Name is min 2 char'),
        description: Yup.string()
          .required('Name is required')
          .min(2, 'Name is min 2 char'),
        element: Yup.string().required('Element is required'),
      })}
      onSubmit={(values) => {
        const hero = {
          ...values,
          id: uuidv4(),
        };

        dispatch(heroAdding(hero));

        request(`http://localhost:3001/heroes`, 'POST', hero)
          .then(() => dispatch(heroAdded(hero)))
          .catch(() => dispatch(heroAddingError()));
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter name?"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage className="error" name="name" component="div" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fs-4">
              Description
            </label>
            <textarea
              required
              name="description"
              className="form-control"
              id="description"
              placeholder="Description"
              style={{ height: '130px' }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <ErrorMessage
              className="error"
              name="description"
              component="div"
            />
          </div>

          <div className="mb-3">
            {filtersLoadingStatus === 'loading' ? <Spinner /> : null}
            {filtersLoadingStatus === 'error' ? (
              <h5 className="text-center mt-5">Error</h5>
            ) : null}
            {filtersLoadingStatus === 'idle' ? (
              <>
                <label htmlFor="element" className="form-label">
                  Choose element
                </label>
                <select
                  required
                  className="form-select"
                  id="element"
                  name="element"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.element}
                >
                  <option value="">I use</option>
                  {getOptions(filters)}
                </select>
                <ErrorMessage
                  className="error"
                  name="element"
                  component="div"
                />
              </>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      )}
    </Formik>
  );
};

export default HeroesAddForm;
