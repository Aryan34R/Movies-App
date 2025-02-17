import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchMoviesRequest, fetchMoviesSuccess, fetchMoviesFailure } from "../slices/MoviesSlice";

const API_URL = "http://localhost:3000/movies"; // Replace with your API URL

// Function to fetch movies
function fetchMoviesApi() {
  return axios.get(API_URL);
}

// Saga to handle fetching movies
function* fetchMoviesSaga() {
  try {
    const response = yield call(fetchMoviesApi);
    yield put(fetchMoviesSuccess(response.data)); // Store data in Redux store
  } catch (error) {
    yield put(fetchMoviesFailure(error.message));
  }
}

// Watcher Saga
export function* watchFetchMovies() {
  yield takeLatest(fetchMoviesRequest.type, fetchMoviesSaga);
}
