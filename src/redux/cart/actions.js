import cartActionsTypes from "./types";

export const toggleCartHidden = () => ({
  type: cartActionsTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: cartActionsTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
  type: cartActionsTypes.REMOVE_ITEM,
  payload: id,
});

export const clearItem = (id) => ({
  type: cartActionsTypes.CLEAR_ITEM,
  payload: id,
});
