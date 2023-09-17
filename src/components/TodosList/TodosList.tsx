import TodoCard from "components/TodoCard/TodoCard";
import { useEffect, useState } from "react";
import { getAllTodos } from "services/todoService";
import type { TodoFromBackend } from "data/TodoFromBackend";
import './TodoList.css'

const TodosList: React.FC<{}> = () => {

  const [todos, setTodos] = useState<TodoFromBackend[]>([]);

  async function getTodos() {
    const todosPromise = getAllTodos();
    todosPromise.then(res => setTodos(res));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todoList">
      {todos.map((todo: TodoFromBackend) => <TodoCard todo={todo} key={todo.id} />)}
    </div>
  )
}

export default TodosList;