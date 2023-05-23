import "./ProductDetails.css";
import { BsFillStarFill } from "react-icons/bs";
import Tilt from "react-parallax-tilt";

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
        <Tilt
          tiltEnable={false}
          scale={1.05}
          transitionSpeed={1000}
          className="product-details-image"
        >
          {" "}
          <img src={selectedProduct?.img} />
        </Tilt>

        <div className="product-details-description">
          <h1 className="product-name">{selectedProduct?.name}</h1>

          <div className="ratings-reviews">
            <span></span>
            <span>{selectedProduct?.rating}</span>{" "}
            <BsFillStarFill color={"orange"} />
            <span>
              <span className="review">
                ({selectedProduct?.reviews}) reviews{" "}
              </span>
            </span>
          </div>

          <div className="product-price-container">
            <span className="product-original-price">
              ${selectedProduct?.original_price}{" "}
            </span>
            <span className="product-discount-price">
              {" "}
              ${selectedProduct?.discounted_price}
            </span>
          </div>

          <p className="description-container">
            <span>Description</span>: {selectedProduct?.description}
          </p>

          <span className="gender-container">
            <span>Gender</span>: {selectedProduct?.category_name}
          </span>
          <p className="size-container">
            <span>Size</span>: {selectedProduct?.size}
          </p>
          

          <div className="tags">
            {!selectedProduct?.is_stock && (
              <span className="out-of-stock">
                {selectedProduct?.is_stock ? "In Stock" : "Out of stock"}
              </span>
            )}
            {selectedProduct?.trending && (
              <span className="trending">
                {selectedProduct?.trending ? "Trending" : ""}
              </span>
            )}
          </div>
          <div className="product-card-buttons-container">
            <button className="add-to-cart-btn">Add to cart</button>
            <button className="add-to-wishlist-btn">Add to wishlist</button>
          </div>
        </div>
      </div>
    </>
  );
};
