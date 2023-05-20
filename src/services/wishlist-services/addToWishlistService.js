import axios from "axios";

export const addToWishlistService = async (product, encodedToken) => {
  return await axios.post(
    "/api/user/wishlist",
    { product: { ...product } },
    {
      headers: { authorization: encodedToken },
    }
  );
};
