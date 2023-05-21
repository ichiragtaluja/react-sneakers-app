import axios from "axios";

export const removeFromCartService = async (productId, encodedToken) => {
  return await axios.delete(`/api/user/cart/${productId}`, {
    headers: { authorization: encodedToken },
  });
};
