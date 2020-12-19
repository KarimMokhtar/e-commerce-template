import actionsTypes from "./types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
export const fetch_collections_start = () => ({
  type: actionsTypes.FETCH_COLLECTIONS_START,
});

export const fetch_collections_success = (collMap) => ({
  type: actionsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collMap,
});

export const fetch_collections_failure = (err) => ({
  type: actionsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: err,
});
export const fetch_collections_start_async = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetch_collections_start());

    collectionRef
      .get()
      .then((snapshot) => {
        const collMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetch_collections_success(collMap));
      })
      .catch((err) => dispatch(fetch_collections_failure(err.message)));
  };
};
