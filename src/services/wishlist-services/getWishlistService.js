import axios from "axios";

export const getWishlistService = async (encodedToken) =>
  await axios.get("/api/user/wishlist", {
    headers: { authorization: encodedToken },
  });
