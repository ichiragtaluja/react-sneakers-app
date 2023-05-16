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
          <span onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}>
            {!isFilterMenuOn ? <TbAdjustmentsHorizontal /> : <RxCross2 />}
          </span>
          <h2>Filters</h2>

          {isFilterMenuOn && (
            <button
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
          )}
        </div>

        <div
          className={
            isFilterMenuOn
              ? "filter-types-container filter-types-container-mobile"
              : "filter-types-container"
          }
        >
          <div className="ratings-container ratings-container-mobile">
            <h3>Ratings</h3>
            <div>
              <datalist id="markers">
                <option label="1" value="1">
                  1
                </option>
                <option label="2.5" value="2.5">
                  2.5
                </option>
                <option label="5" value="5">
                  5
                </option>
              </datalist>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "ADD_RATINGS",
                    payload: Number(e.target.value),
                  })
                }
                list="markers"
                id="price"
                type="range"
                min="1"
                max="5"
                value={state.filters.rating}
              />
            </div>
          </div>

          <div className="category-container">
            <h3>Categories</h3>
            <div>
              {state.allCategories?.map(({ categoryName }) => (
                <div key={categoryName}>
                  <label
                    htmlFor={`category-${categoryName}`}
                  >{`${categoryName}'s wear`}</label>
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
                </div>
              ))}
            </div>
          </div>

          <div className="price-container">
            <h3>Price</h3>
            <div>
              <label htmlFor="below-200">Below $200</label>
              <input
                checked={state.filters.price.find((price) =>
                  price.min === 0 ? true : false
                )}
                onChange={() =>
                  dispatch({ type: "ADD_PRICE", payload: { min: 0, max: 200 } })
                }
                id="below-200"
                type="checkbox"
              />
              <label htmlFor="201-999">$201 - $999</label>
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
              <label htmlFor="1000-1999">$1000 - $1999</label>
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
              <label htmlFor="above 2000">Over $2000</label>
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
            </div>
          </div>

          <div className="sorting-container">
            <h3>Sort by price</h3>

            <div>
              <label htmlFor="high-to-low">Price-high to low</label>
              <input
                onChange={() =>
                  dispatch({ type: "ADD_SORT", payload: "highToLow" })
                }
                name="sort"
                id="high-to-low"
                type="radio"
              />

              <label htmlFor="low-to-high">Price-low to high</label>
              <input
                onChange={() =>
                  dispatch({ type: "ADD_SORT", payload: "lowToHigh" })
                }
                name="sort"
                id="low-to-high"
                type="radio"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
