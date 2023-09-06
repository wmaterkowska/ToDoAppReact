import type { Todo } from "types";

export default function ToDoCard({ todo }: { todo: Todo }) {

  return (
    <div>
      <p>{todo.title}</p>
      <p>{todo.content}</p>
      <p>{todo.lastChange}</p>
    </div>
  )
}