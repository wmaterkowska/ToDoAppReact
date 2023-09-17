export type TodoFromBackend = {
  id: string,
  content: string,
  title?: string,
  done: boolean,
  lastChange: string
}