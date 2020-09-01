import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShopCollectoins } from "../../redux/shop/selector";
import CollectionPreview from "../../components/collection-preview/collection-preview.js";

const ShopPage = ({ collections }) => {
  return (
    <div className="shop-page">
      {collections.map(({ id, ...collectionProps }) => (
        <CollectionPreview key={id} {...collectionProps} />
      ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  collections: selectShopCollectoins,
});
export default connect(mapStateToProps)(ShopPage);
