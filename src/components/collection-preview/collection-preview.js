import React from "react";

import "./collection-preview.scss";
import CollectItem from "../collection-item/collection-item";

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, ...itemProps }) => (
          <CollectItem key={id} {...itemProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
