import axios from "axios";

export const addAddressService = async (address, token) => {
  console.log("I was here", address, token)
  return await axios.post(
    "/api/user/address/",
    { address },
    { headers: { authorization: token } }
  );
};
