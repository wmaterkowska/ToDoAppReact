import type { SignUpUser } from "data/SignUpUser";

// export async function signupUser(signupObject: SignUpUser) {

//   const options = {
//     method: 'POST',
//     // credentials: "include",
//     // mode: "cors",
//     body: JSON.stringify(signupObject)
//   }
//   const response = await fetch(`http://localhost:3000/auth/signup`, options);
//   console.log(await response.json());
//   return response;
// }

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

export { signupUser };