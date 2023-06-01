import axios from "axios";

export const clearCartService = async (token) => {
  return await axios.post(
    "/api/user/cart/clearCart",
    {},
    { headers: { authorization: token } }
  );
};
