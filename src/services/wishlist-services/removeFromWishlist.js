import axios from "axios";

export const removeFromWishlistService = async (productId, encodedToken) => {
  return await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: encodedToken },
  });
};
