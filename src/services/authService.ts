const getAuthObject = () => {
  let authData: string = " ";
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'authCookie') {
        authData = (decodeURIComponent(value));
        console.log(authData, "=============================0");
        break;
      }
    }
  }
  try {
    return JSON.parse(authData);
  } catch (err) {
    console.log(err)
  }
  return false;
}

export { getAuthObject };