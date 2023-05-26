import axios from "axios";

export const updateAddressService = async (address, token) => {
  return await axios.post(
    `/api/user/address/${address._id}`,
    { address },
    { headers: { authorization: token } }
  );
};
