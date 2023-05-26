import axios from "axios";

export const removeAddressService = async (address, token) => {
  return await axios.delete(`/api/user/address/${address._id}`, {
    headers: { authorization: token },
  });
};
