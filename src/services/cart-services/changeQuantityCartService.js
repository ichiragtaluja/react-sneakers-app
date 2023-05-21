import axios from "axios";

export const changeQuantityCartService = async (
  productId,
  encodedToken,
  type
) => {
  return await axios.post(
    `/api/user/cart/${productId}`,

    {
      action: {
        type,
      },
    },
    {
      headers: { authorization: encodedToken },
    }
  );
};
