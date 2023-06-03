import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Chirag",
    lastName: "Taluja",
    email: "chiragtaluja@apple.com",
    password: "chiragtaluja",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
