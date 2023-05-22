import axios from "axios";
export const loginService = async (email, password) => {
  
  return await axios.post("/api/auth/login", { email, password });
};
