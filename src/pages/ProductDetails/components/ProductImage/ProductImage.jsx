import "./ProductImage.css";
import Tilt from "react-parallax-tilt";


import React from "react";

export const ProductImage = ({ selectedProduct }) => {
  return (
    <Tilt
      tiltEnable={false}
      scale={1.05}
      transitionSpeed={1000}
      className="product-details-image"
    >
      {" "}
      <img src={selectedProduct?.img} alt={selectedProduct.name}/>
    </Tilt>
  );
};
