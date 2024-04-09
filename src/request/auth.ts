import request from "./request";

export function signIn(data: { [key: string]: FormDataEntryValue }) {
  return request.post("/user/login", data);
}
export function signUp(data: { [key: string]: FormDataEntryValue }) {
  return request.post("/user/registry", data);
}
