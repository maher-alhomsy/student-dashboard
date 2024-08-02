import { useContext } from "react";

import { UserContext } from "../context/user-provider";

export const useSession = () => {
  const ctx = useContext(UserContext);

  if (!ctx) throw Error("Something went wrong");

  return ctx;
};
