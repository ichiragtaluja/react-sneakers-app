import axios from "axios";

export const signupService = async (email, password, firstName, lastName) =>
  await axios.post("/api/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
