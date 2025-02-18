import { all } from 'redux-saga/effects';
import moviesSaga from './MoviesSaga';

export default function* rootSaga() {
  yield all([
    moviesSaga(),
    // Add other sagas here if needed
  ]);
}
