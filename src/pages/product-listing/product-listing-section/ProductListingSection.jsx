import "./ProductListingSection.css";

import React from "react";
import { useData } from "../../../contexts/DataProvider";
import { Link } from "react-router-dom";
import { getCategoryWiseProducts } from "../../../helpers/filter-functions/category";
import { getRatedProducts } from "../../../helpers/filter-functions/ratings";
import { getPricedProducts } from "../../../helpers/filter-functions/price";
import { getSortedProducts } from "../../../helpers/filter-functions/sort";
import { getSearchedProducts } from "../../../helpers/searchedProducts";

export const ProductListingSection = () => {
  const { state } = useData();

  const {
    allProductsFromApi,
    allCategories,
    inputSearch,
    filters: { rating, categories, price, sort },
  } = state;

  const searchedProducts = getSearchedProducts(allProductsFromApi, inputSearch);

  const ratedProducts = getRatedProducts(searchedProducts, rating);

  const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);

  const pricedProducts = getPricedProducts(categoryProducts, price);

  const sortedProducts = getSortedProducts(pricedProducts, sort);

  return (
    <div className="product-card-container">
      {sortedProducts.map((product) => {
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
              <p>original price: {original_price}</p>
              <p>discounted price: {discounted_price}</p>
              <p>reviews: {reviews}</p>
              <p>rating: {rating}</p>
              <p>gender: {category_name}</p>
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
