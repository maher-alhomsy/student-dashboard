import axios from "axios";

export const loginEvent = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await axios.post("/User/SignIn", { username, password });
};
