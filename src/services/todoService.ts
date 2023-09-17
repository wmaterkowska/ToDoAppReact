const getAllTodos = () => {

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

  const authObject = JSON.parse(authData);

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

export { getAllTodos };