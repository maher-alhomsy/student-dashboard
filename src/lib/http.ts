import axios from "axios";
import { Gender, Grade, Student } from "../types";

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

export const deleteStudent = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const { data } = await axios.delete(`/Student/Remove?Id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllGrades = async (token: string) => {
  const { data } = await axios.get("/Settings/GetAllGrades", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Grade[];
};

export const getAllGenders = async (token: string) => {
  const { data } = await axios.get("/Settings/GetAllGenders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data as Gender[];
};
