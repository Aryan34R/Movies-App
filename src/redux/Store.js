import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moviesReducer from './sagas/MoviesSaga';
import rootSaga from './sagas/rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with your reducers and include the saga middleware
const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
