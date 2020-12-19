import { call, takeLatest, all, put } from "redux-saga/effects";

import userActionTypes from "../user/types";
import { clearCart } from "./actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
