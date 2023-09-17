import type { LoginUser } from "data/LoginUser";
import type { SignUpUser } from "data/SignUpUser";

const signupUser = (user: SignUpUser) => {
  return fetch(`http://localhost:3000/auth/signup`, {
    method: "POST",
    // credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const loginUser = (user: LoginUser) => {
  return fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    // credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((response) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `authCookie=${encodeURIComponent(JSON.stringify(response))}; expires=${expires.toUTCString()}`
    })
    .catch((err) => console.log(err));
};

export { signupUser, loginUser };