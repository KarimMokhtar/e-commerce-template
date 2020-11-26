import { takeLatest, put, all, call } from "redux-saga/effects";
import userActionTypes from "./types";

import UserActionTypes from "./types";

import {
  googleProvider,
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess } from "./actions";

export function* getSnapshotFromUserAuth(userAuth) {
  const userRef = yield call(createUserProfileDocument, userAuth);
  const userSnapshot = yield userRef.get();

  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

export function* singInWithGoogle() {
  try {
    const { user } = yield auth.singInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* singInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, singInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}