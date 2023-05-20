import React from "react";
import { useUserData } from "../contexts/UserDataProvider";

export const Wishlist = () => {
  const { userDataState } = useUserData();
  
  return (
    <div>
      <h1>Wishlist</h1>
      {userDataState.wishlistProducts?.map((product) => (
        <p key={product.name}>{product.name}</p>
      ))}
    </div>
  );
};
