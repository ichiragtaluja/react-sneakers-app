import axios from "axios";

export const getAddressListService = async (token) => {
  return await axios.get("/api/user/address", {
    headers: { authorization: token },
  });
};
