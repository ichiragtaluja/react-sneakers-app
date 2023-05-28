import axios from "axios";

export const addOrderService = async (order, token) => {
  return await axios.post(
    "api/user/orders",
    { ...order },
    { headers: { authorization: token } }
  );
};
