import React from "react";
import { useData } from "../../../../contexts/DataProvider";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";

export const CategoriesSection = () => {
  const { state, dispatch } = useData();
  return (
    <div className="categories-container">
      {state.allCategories.map(({ _id, categoryName, img }) => (
        <Link
          onClick={() =>
            dispatch({
              type: "ADD_CATEGORIES_FROM_HOME",
              payload: categoryName,
            })
          }
          to="/product-listing"
          className="category-card"
          key={_id}
        >
          <h3>{categoryName}</h3>
          <div className="img-cont">
            <img src={img} alt="category" />
          </div>
        </Link>
      ))}
    </div>
  );
};
