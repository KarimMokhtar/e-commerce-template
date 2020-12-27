import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/withSpinner/with-spinner";
import { fetch_collections_start } from "../../redux/shop/actions";
import { selectIsCollectionLoaded } from "../../redux/shop/selector";
import Spinner from "../../components/spinner";

const CollectionsOverview = lazy(() =>
  import("../../components/collections-overview/collections-overview")
);
const CollectionPage = lazy(() => import("../collection/collection"));
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStart, isLoaded }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
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
