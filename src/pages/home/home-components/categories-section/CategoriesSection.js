import React from "react";
import { useData } from "../../../../contexts/DataProvider";
// import { categories } from "../../../../backened/db/categories";
import "./CategoriesSection.css";

export const CategoriesSection = () => {
  const { state } = useData();
  return (
    <div className="categories-container">
      {state.allCategories.map(({ _id, categoryName, img }) => (
        <div className="category-card" key={_id}>
          <h3>{categoryName}</h3>
          <img src={img} alt="category"/>
        </div>
      ))}
    </div>
  );
};
