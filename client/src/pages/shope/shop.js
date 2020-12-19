import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/collections-overview";
import WithSpinner from "../../components/withSpinner/with-spinner";
import CollectionPage from "../collection/collection";
import { fetch_collections_start } from "../../redux/shop/actions";
import { selectIsCollectionLoaded } from "../../redux/shop/selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStart, isLoaded }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  return (
    <div className="shop-page">
      <Route
        path={`${match.path}`}
        exact
        render={(props) => (
          <CollectionsOverviewWithSpinner {...props} loading={!isLoaded} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner {...props} loading={!isLoaded} />
        )}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoaded: selectIsCollectionLoaded,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetch_collections_start()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
