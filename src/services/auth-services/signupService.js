import axios from "axios";

export const signupService = async (email, password) =>
  await axios.post("/api/auth/signup", { email, password });
