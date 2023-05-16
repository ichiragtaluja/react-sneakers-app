import "./ProductDetails.css";

import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

export const ProductDetails = () => {
  const { state } = useData();
  const { productId } = useParams();

  const selectedProduct = state.allProductsFromApi.find(
    ({ _id }) => _id === productId
  );

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
  } = selectedProduct;

  return (
    <>
      <div>
        <div className="product-details-image">
          {" "}
          <img src={img} alt={description} />
        </div>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>Size: {size}</p>
          <p>Price: ${discounted_price}</p>
          <button>Add to cart</button>
          <button>Add to wishlist</button>
        </div>
      </div>
    </>
  );
};
