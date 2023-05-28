import axios from "axios";

export const getOrderService = async (token) => {
  return await axios.get("api/user/orders", {
    headers: { authorization: token },
  });
};
