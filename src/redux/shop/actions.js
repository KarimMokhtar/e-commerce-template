import actionsTypes from "./types";

export const update_collections = (collMap) => ({
  type: actionsTypes.UPDATE_COLLECTIONS,
  payload: collMap,
});
