import TodoCard from "components/TodoCard/TodoCard";
import { useEffect, useState } from "react";
import { addTodo, getAllTodos } from "services/todoService";
import type { TodoFromBackend } from "data/TodoFromBackend";
import type { AddTodo } from "data/AddTodo";
import './TodoList.css'

const TodosList: React.FC<{}> = () => {

  const [todos, setTodos] = useState<TodoFromBackend[]>([]);

  async function getTodos() {
    const todosPromise = getAllTodos();
    todosPromise.then(res => setTodos(res));
  }


  function handleAddBtnCLick(event: React.MouseEvent) {
    const newTodo: TodoFromBackend = { content: " ", id: '-1', lastChange: (new Date()).toString(), done: false }
    setTodos((old) => [...old, newTodo])
    // const newTodoFromBackend = addTodo(newTodo).then(res => {
    //   console.log(res);
    //   setTodos((old) => [...old, res])
    // });
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