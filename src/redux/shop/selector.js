import { createSelector } from "reselect";

const selectShop = ({ shop }) => shop;

export const selectShopCollectoins = createSelector(
  [selectShop],
  (shop) => shop.collections,
);
