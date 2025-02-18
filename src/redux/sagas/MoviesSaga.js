import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchMoviesSuccess, fetchMoviesFailure } from '../slices/MoviesSlice';

// Function to fetch movies from your API
function fetchMoviesApi() {
  return fetch("http://localhost:3000/movies").then(response => response.json());
}

// Worker saga: makes the API call when the watcher saga sees the action
function* fetchMovies() {
  try {
    const movies = yield call(fetchMoviesApi);
    yield put(fetchMoviesSuccess(movies));
  } catch (error) {
    yield put(fetchMoviesFailure(error.toString()));
  }
}

// Watcher saga: watches for the fetchMoviesRequest action
export default function* moviesSaga() {
  yield takeEvery('movies/fetchMoviesRequest', fetchMovies);
}
