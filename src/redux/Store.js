import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moviesReducer from './sagas/MoviesSaga';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);

export default store;
