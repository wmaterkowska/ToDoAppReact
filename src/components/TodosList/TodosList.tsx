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


  function handleAddBtnCLick(event: React.MouseEvent) {
    const newTodo: TodoFromBackend = { id: '-1', content: " ", lastChange: (new Date()).toString(), done: false }
    setTodos((old) => [...old, newTodo])
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="todoList" id="todoList">
        {todos.map((todo: TodoFromBackend) => <TodoCard todo={todo} key={todo.id} />)}
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />


      <div className="footer-container">
        <div className="btn-container">
          <button className="addBtn" onClick={handleAddBtnCLick}><span className="material-symbols-outlined">add</span></button>
        </div>
      </div>
    </>
  )
}

export default TodosList;