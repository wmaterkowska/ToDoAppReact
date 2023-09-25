import type { AddTodo } from "data/AddTodo";
import { getAuthObject } from "./authService.ts"
import type { UpdateTodo } from "data/UpdateTodo.ts";

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

const updateTodo = (id: string, updatedTodo: UpdateTodo) => {

  const authObject = getAuthObject();

  return fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authObject['access_token']}`,
      "Authentication": `user_id ${authObject['user_id']}`
    },
    body: JSON.stringify(updatedTodo),
  })
    .then(res => res.json())
    .catch((err) => console.log(err))
}

const deleteTodo = (id: string) => {

  const authObject = getAuthObject();

  return fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authObject['access_token']}`,
      "Authentication": `user_id ${authObject['user_id']}`
    },
  })
    .then(res => res.json())
    .catch((err) => console.log(err))
}

export { getAllTodos, addTodo, updateTodo, deleteTodo };