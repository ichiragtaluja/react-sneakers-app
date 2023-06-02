import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

import React from "react";
import "./Filter.css";
import { useData } from "../../../../contexts/DataProvider";

export const Filter = () => {
  const { dispatch, state } = useData();
  const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);

  return (
    <div>
      <div
        className={
          isFilterMenuOn
            ? "filter-container filter-container-mobile-open"
            : "filter-container filter-container-mobile-closed"
        }
      >
        <div
          className={
            !isFilterMenuOn
              ? "filter-header filter-header-mobile-closed"
              : "filter-header filter-header-mobile-open"
          }
        >
          <span
            className="close-tab"
            onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}
          >
            {!isFilterMenuOn ? <TbAdjustmentsHorizontal /> : <RxCross2 />}
          </span>
          <h2>Filters</h2>

          <button
            className={isFilterMenuOn ? "reset-btn" : "reset-btn-hide"}
            onClick={() =>
              dispatch({
                type: "RESET",
                payload: {
                  rating: "",
                  categories: [],
                  price: [],
                  sort: "",
                },
              })
            }
          >
            Reset
          </button>
        </div>

        <div
          className={
            isFilterMenuOn
              ? "filter-types-container filter-types-container-mobile"
              : "filter-types-container"
          }
        >
          <div className="price-container">
            <h3>Price</h3>
            <div className="price-input-container">
              <label htmlFor="below-200">
                Below $200
                <input
                  checked={state.filters.price.find((price) =>
                    price.min === 0 ? true : false
                  )}
                  onChange={() =>
                    dispatch({
                      type: "ADD_PRICE",
                      payload: { min: 0, max: 200 },
                    })
                  }
                  id="below-200"
                  type="checkbox"
                />
              </label>

              <label htmlFor="201-999">
                $201 - $999
                <input
                  checked={state.filters.price.find((price) =>
                    price.min === 201 ? true : false
                  )}
                  onChange={() =>
                    dispatch({
                      type: "ADD_PRICE",
                      payload: { min: 201, max: 999 },
                    })
                  }
                  id="201-999"
                  type="checkbox"
                />
              </label>

              <label htmlFor="1000-1999">
                $1000 - $1999
                <input
                  checked={state.filters.price.find((price) =>
                    price.min === 1000 ? true : false
                  )}
                  onChange={() =>
                    dispatch({
                      type: "ADD_PRICE",
                      payload: { min: 1000, max: 1999 },
                    })
                  }
                  id="1000-1999"
                  type="checkbox"
                />
              </label>

              <label htmlFor="above 2000">
                Over $2000
                <input
                  checked={state.filters.price.find((price) =>
                    price.min === 2000 ? true : false
                  )}
                  onChange={() =>
                    dispatch({
                      type: "ADD_PRICE",
                      payload: { min: 2000, max: 5000 },
                    })
                  }
                  id="above 2000"
                  type="checkbox"
                />
              </label>
            </div>
          </div>

          <div className="ratings-container ratings-container-mobile">
            <h3>Ratings (min)</h3>
            <div className="input-range">
              <datalist id="markers">
                <option label="0" value="0">
                  0
                </option>
                <option label="2.5" value="2.5">
                  2.5
                </option>
                <option label="5.0" value="5">
                  5
                </option>
              </datalist>
              <input
                step="0.1"
                onChange={(e) =>
                  dispatch({
                    type: "ADD_RATINGS",
                    payload: Number(e.target.value),
                  })
                }
                // list="markers"
                id="price"
                type="range"
                min="0"
                max="5.0"
                value={state.filters.rating}
              />
            </div>
          </div>

          <div className="category-container">
            <h3>Categories</h3>
            <div className="category-input-container">
              {state.allCategories?.map(({ categoryName }) => (
                <div className="category-input-container" key={categoryName}>
                  <label htmlFor={`category-${categoryName}`}>
                    {`${categoryName}'s wear`}
                    <input
                      checked={state.filters.categories.includes(categoryName)}
                      onChange={() =>
                        dispatch({
                          type: "ADD_CATEGORIES",
                          payload: categoryName,
                        })
                      }
                      id={`category-${categoryName}`}
                      type="checkbox"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="sorting-container">
            <h3>Sort by price</h3>

            <div className="sorting-input-container">
              <label htmlFor="high-to-low">
                Price-high to low
                <input
                  checked={state.filters.sort === "highToLow"}
                  onChange={() =>
                    dispatch({ type: "ADD_SORT", payload: "highToLow" })
                  }
                  name="sort"
                  id="high-to-low"
                  type="radio"
                />
              </label>

              <label htmlFor="low-to-high">
                Price-low to high
                <input
                  checked={state.filters.sort === "lowToHigh"}
                  onChange={() =>
                    dispatch({ type: "ADD_SORT", payload: "lowToHigh" })
                  }
                  name="sort"
                  id="low-to-high"
                  type="radio"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
