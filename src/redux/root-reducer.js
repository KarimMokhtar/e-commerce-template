import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import directorReducer from "./dirctory/reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directorReducer,
});
export default persistReducer(persistConfig, rootReducer);
