import "./ProductDetails.css";

import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();
  console.log("2");

  const selectedProduct = state.allProductsFromApi?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  // const {
  //   // _id,
  //   name,
  //   original_price,
  //   discounted_price,
  //   category_name,
  //   is_stock,
  //   rating,
  //   reviews,
  //   description,
  //   trending,
  //   size,
  //   img,
  // } = selectedProduct;

  return (
    <>
      <div className="products-page-container">
        <div className="product-details-image">
          {" "}
          <img src={selectedProduct?.img} />
        </div>
        <div className="product-details-description">
          <h1>{selectedProduct?.name}</h1>
          <span>{selectedProduct?.category_name}</span>
          <p>{selectedProduct?.description}</p>
          <p>Size: {selectedProduct?.size}</p>
          <div className="price-details">
            <span>{selectedProduct?.original_price}</span>
            <span>Price: ${selectedProduct?.discounted_price}</span>
          </div>
          <div className="ratings-reviews">
            <span>Rating: {selectedProduct?.rating}</span>{" "}
            <span>{selectedProduct?.reviews} reviews</span>
          </div>
          <div className="tags">
            <span className="in-stock">
              {selectedProduct?.is_stock ? "In Stock" : "Out of stock"}
            </span>
            <span className="trending">
              {selectedProduct?.trending ? "Trending" : ""}
            </span>
          </div>

          <button>Add to cart</button>
          <button>Add to wishlist</button>
        </div>
      </div>
    </>
  );
};
