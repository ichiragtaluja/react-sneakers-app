import React from "react";
import "./ProductListing.css";
import { Filter } from "./components/Filter/Filter";
import { ProductListingSection } from "./components/ProductListingSection/ProductListingSection";
import { SyncLoader } from "react-spinners";
import { useData } from "../../contexts/DataProvider";

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
