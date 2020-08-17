import cartActionsTypes from "./types";
import {addItemToCart} from './utils'
const initialState = {
  hidden: true,
  cartItems:[]
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionsTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case cartActionsTypes.ADD_ITEM:
      return{
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    default:
      return state;
  }
};

export default cartReducer;
