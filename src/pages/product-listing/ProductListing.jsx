import React from "react";
import "./ProductListing.css";
import { Filter } from "./components/filter/Filter";
import { ProductListingSection } from "./components/product-listing-section/ProductListingSection";
import { SyncLoader } from "react-spinners";
import { useData } from "../../contexts/DataProvider";
import { AuthProvider } from "../../contexts/AuthProvider";

export const ProductListing = () => {
  const override = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
  };
  const { loading } = useData();
  return !loading ? (
    <div className="page-container">
      <Filter className="filters" />
      <ProductListingSection className="products-container" />
    </div>
  ) : (
    <SyncLoader cssOverride={override} loading={loading} color="black" />
  );
};
