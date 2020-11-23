import { call, all } from "redux-saga/effects";

import { fetchCollectionsStart } from "./shop/sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
