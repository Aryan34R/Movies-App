import { all } from "redux-saga/effects";
import { watchFetchMovies } from "./MoviesSaga"; // Import other sagas as needed

export function* rootSaga() {
  yield all([
    watchFetchMovies(), // Add more sagas here if needed
  ]);
}
