import type { AddTodo } from "data/AddTodo";

const getAllTodos = () => {

  const authObject = getAuthObject();

  return fetch(`http://localhost:3000/todos`, {
    method: "GET",
    // credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authObject['access_token']}`,
      "Authentication": `user_id ${authObject['user_id']}`
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

};

const addTodo = (newTodo: AddTodo) => {

  const authObject = getAuthObject();
  console.log(authObject);

  return fetch(`http://localhost:3000/todos`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authObject['access_token']}`,
      "Authentication": `user_id ${authObject['user_id']}`
    },
    body: JSON.stringify(newTodo),
  })
    .then(res => res.json())
    .catch((err) => console.log(err))
}


const getAuthObject = () => {
  let authData: string = " ";
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'authCookie') {
        authData = (decodeURIComponent(value));
        break;
      }
    }
  }
  return JSON.parse(authData);
}

export { getAllTodos, addTodo };