export function isValidEmail(email: string) {

  return String(email).match(/\S+@\S+\.\S+/);

}