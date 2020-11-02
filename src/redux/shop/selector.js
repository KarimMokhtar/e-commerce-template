import { createSelector } from "reselect";

const selectShop = ({ shop }) => shop;

export const selectShopCollectoins = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectShopCollectoins],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (name) =>
  createSelector([selectShopCollectoins], (collections) =>
    collections ? collections[name] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
)