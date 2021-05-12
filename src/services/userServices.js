import http from "./httpService";
import config from "./config.json";

export const userRegister = (user) => {
  return http.post(`${config.toplearnapi}/api/register`, JSON.stringify(user));
};

export const userLogin = (user) => {
  return http.post(`${config.toplearnapi}/api/login`, JSON.stringify(user));
};
// admin username:younes.gh@chmail.ir
// admin pass:123456
