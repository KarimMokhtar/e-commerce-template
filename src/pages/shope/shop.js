import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/collections-overview";
import WithSpinner from "../../components/withSpinner/with-spinner";
import CollectionPage from "../collection/collection";
import { fetch_collections_start_async } from "../../redux/shop/actions";
import { selectIsCollectionFetching } from "../../redux/shop/selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetch_collections_start_async, isFetching }) => {
  useEffect(()=>{
    fetch_collections_start_async()
  },[fetch_collections_start_async])
  return (
    <div className="shop-page">
      <Route
        path={`${match.path}`}
        exact
        render={(props) => (
          <CollectionsOverviewWithSpinner {...props} loading={isFetching} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner {...props} loading={isFetching} />
        )}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetch_collections_start_async: () =>
    dispatch(fetch_collections_start_async()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
