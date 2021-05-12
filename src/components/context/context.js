import { createContext } from "react";

export const simpleContext = createContext({
  fullname: "",
  setFullname: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  policy: "",
  setPolicy: () => {},
  validator: null,
  handleLogin: () => {},
  handleRegister: () => {},
});
