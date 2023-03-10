import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "http://localhost:9103/interoperability/api/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: responseData } = await http.post(apiEndpoint + "login", {
    username: username,
    password: password,
  });
  localStorage.setItem(tokenKey, responseData.token);
}

export async function logout() {
  await http.get(apiEndpoint + "logout");
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt).userInfo.name;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default { login, logout, getCurrentUser, getJwt };