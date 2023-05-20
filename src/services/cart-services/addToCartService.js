import axios from "axios";

export const addToCartService = async (product, encodedToken) => {
  return await axios.post(
    "/api/user/cart",
    { product: { ...product } },
    {
      headers: { authorization: encodedToken },
    }
  );
};
