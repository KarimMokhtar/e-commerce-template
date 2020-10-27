import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import WithSpinner from "../../components/withSpinner/with-spinner";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import CollectionPage from "../collection/collection";
import { update_collections } from "../../redux/shop/actions";
import { connect } from "react-redux";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, update_collections }) => {
  const [loading, setLoading] = useState(true);
  let unsubscribeFromSnapshot = null;

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
      const collMap = convertCollectionsSnapshotToMap(snapshot);
      update_collections(collMap);
      setLoading(false);
    });
    return () => unsubscribeFromSnapshot();
  }, [update_collections]);
  return (
    <div className="shop-page">
      <Route
        path={`${match.path}`}
        exact
        render={(props) => (
          <CollectionsOverviewWithSpinner {...props} loading={loading} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner {...props} loading={loading} />
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  update_collections: (collMap) => dispatch(update_collections(collMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
