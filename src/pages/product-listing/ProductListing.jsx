import React from "react";
import "./ProductListing.css";
import { Filter } from "./components/filter/Filter";
import { ProductListingSection } from "./product-listing-section/ProductListingSection";

export const ProductListing = () => {
  return (
    <div className="page-container">
      <Filter className="filters" />
      <ProductListingSection className="products-container" />
    </div>
  );
};
