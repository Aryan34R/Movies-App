import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchMoviesSuccess, fetchMoviesFailure } from '../slices/MoviesSlice';

function fetchMoviesApi() {
  return fetch("http://localhost:3000/movies").then(response => response.json());
}

function* fetchMovies() {
  try {
    const movies = yield call(fetchMoviesApi);
    yield put(fetchMoviesSuccess(movies));
  } catch (error) {
    yield put(fetchMoviesFailure(error.toString()));
  }
}

export default function* moviesSaga() {
  yield takeEvery('movies/fetchMoviesRequest', fetchMovies);
}
