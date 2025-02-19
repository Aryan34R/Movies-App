import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchMoviesSuccess, fetchMoviesFailure } from '../slices/MoviesSlice';

async function fetchMoviesApi() {
  // return fetch("http://localhost:3000/movies").then(response => response.json());
  const response = await fetch("http://localhost:3000/movies");
  return response.json();
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
