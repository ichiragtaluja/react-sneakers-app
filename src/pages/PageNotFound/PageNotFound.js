import "./PageNotFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="no-items-container">
      <h2 className="page-heading">Error 404</h2>
      <p className="page-heading">Page not found</p>
      <button
        onClick={() => navigate("/product-listing")}
        className="explore-btn"
      >
        Back to Home
      </button>
    </div>
  );
};
