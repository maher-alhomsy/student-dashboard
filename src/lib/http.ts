import axios from "axios";

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
