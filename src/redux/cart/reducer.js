import cartActionsTypes from "./types";
import { addItemToCart, removeItemFromCart } from "./utils";
const initialState = {
  hidden: true,
  cartItems: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionsTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cartActionsTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case cartActionsTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case cartActionsTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((ele) => ele.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
