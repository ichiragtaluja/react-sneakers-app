import "./ProductListingSection.css";

import React from "react";
import { useData } from "../../../contexts/DataProvider";
import { Link } from "react-router-dom";

export const ProductListingSection = () => {
  const { state } = useData();
  return (
    <div className="product-card-container">
      {state.allProductsFromApi.map((product) => {
        const {
          _id,
          name,
          original_price,
          discounted_price,
          category_name,
          is_stock,
          rating,
          reviews,
          description,
          trending,
          size,
          img,
        } = product;

        return (
          <div className="product-card" key={_id}>
            <Link to={`/product-details/${_id}`}>
              <div className="product-card-image">
                <img width="200px" src={img} />
              </div>
            </Link>

            <div className="product-card-details">
              <h4>{name}</h4>
              <p>{original_price}</p>
              <p>{discounted_price}</p>
              <p>{reviews}</p>
              <p>{rating}</p>
            </div>

            <div className="product-card-buttons">
              <button>Add to cart</button>
              <button>Add to wishlist</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
