import { takeLatest, call, put } from "redux-saga/effects";

import actionsTypes from "./types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import {
  fetch_collections_failure,
  fetch_collections_success,
} from "./actions";
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetch_collections_success(collMap));
  } catch (err) {
    yield put(fetch_collections_failure(err.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(actionsTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
