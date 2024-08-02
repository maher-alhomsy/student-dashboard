import axios from "axios";
import { Student } from "../types";

export const loginEvent = async ({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) => {
  const { data } = await axios.post("/User/SignIn", { userName, password });

  return data as { userName: string; token: string };
};

export const getStudents = async (token: string) => {
  const { data } = await axios.get("/Student/GetAll", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Student[];
};
