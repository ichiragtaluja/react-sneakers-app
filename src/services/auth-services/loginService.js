import axios from "axios";
export const loginService = async (email, password) =>
  await axios.post("/api/auth/login", { email, password });
