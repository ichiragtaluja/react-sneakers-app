import axios from "axios";

export const getCartService = async (encodedToken) =>
  await axios.get("/api/user/cart", {
    headers: { authorization: encodedToken },
  });
