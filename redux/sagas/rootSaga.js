import { all } from 'redux-saga/effects';
import moviesSaga from './MoviesSaga';

export default function* rootSaga() {
  yield all([
    moviesSaga(),
  ]);
}
