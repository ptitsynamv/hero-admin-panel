import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { fetchFilters, selectAllFilters } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectAllFilters);
  const [createHero, { isLoading, isError }] = useCreateHeroMutation();

  useEffect(() => {
    dispatch(fetchFilters());
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

        createHero(hero);
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
            {isLoading ? <Spinner /> : null}
            {isError ? <h5 className="text-center mt-5">Error</h5> : null}
            {!isLoading && !isError ? (
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
