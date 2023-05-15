import React from "react";
import { useData } from "../../contexts/DataProvider";
import "./ProductListing.css";

export const ProductListing = () => {
  const { state } = useData();

  return (
    <div>
      <div className="filter-container">
        <div className="filter-header">
          <h2>Filters</h2>
          <span>clear all</span>
        </div>

        <div className="filter-types-container">
          <div className="price-container">
            <h3>Price</h3>
            <datalist id="markers">
              <option label="1" value="1">
                1
              </option>
              <option label="1250" value="1250">
                1250
              </option>
              <option label="2500" value="2500">
                2500
              </option>
            </datalist>
            <input
              list="markers"
              id="price"
              type="range"
              min="1"
              max="2500"
              value=""
            />
          </div>

          <div className="category-container">
            <h3>Categories</h3>
            <label for="category-men">Men's wear</label>
            <input id="category-men" type="checkbox" />
            <label for="category-women">Women's wear</label>
            <input id="category-women" type="checkbox" />
            <label for="category-kids">Kid's wear</label>
            <input id="category-kids" type="checkbox" />
          </div>

          <div className="ratings-container">
            <h3>Ratings</h3>
            <label for="above-4">4 stars or above</label>
            <input id="above-4" type="radio" />
            <label for="above-3">3 stars or above</label>
            <input id="above-3" type="radio" />
            <label for="above-2">2 stars or above</label>
            <input id="above-2" type="radio" />
            <label for="above-1">1 stars or above</label>
            <input id="above-1" type="radio" />
          </div>

          <div className="sorting-container">
            <h3>Sort by price</h3>

            <label for="high-to-low">Price-high to low</label>
            <input id="high-to-low" type="radio" />

            <label for="low-to-high">Price-low to high</label>
            <input id="low-to-high" type="radio" />
          </div>
          
        </div>
      </div>

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
              <div className="product-card-image">
                <img width="200px" src={img} />
              </div>
              <div className="product-card-details">
                <h4>{name}</h4>
                <p>{original_price}</p>
                <p>{discounted_price}</p>
                <p>{reviews}</p>
                <p>{rating}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
