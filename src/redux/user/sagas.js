import { takeLatest, put, all, call } from "redux-saga/effects";
import userActionTypes from "./types";

import UserActionTypes from "./types";

import {
  googleProvider,
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { googleSignInFailure, googleSignInSuccess } from "./actions";
export function* singInWithGoogle() {
  try {
    const { user } = yield auth.singInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();

    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, singInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
