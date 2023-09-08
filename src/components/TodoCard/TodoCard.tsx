import "./TodoCard.css"
import type { Todo } from "types";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);
interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {


  const [isChecked, setIsChecked] = useState(todo.done);
  const [toEdit, setToEdit] = useState(false);

  const todoDate = dayjs(todo.lastChange).fromNow();

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    const updatedTodo = { ...todo };
    updatedTodo.done = event.target.checked;
    setIsChecked(updatedTodo.done)
  }

  function handleClickOnCard() {
    setToEdit(true);
  }

  function handleBackArrow(event: React.MouseEvent) {
    event.stopPropagation();
    setToEdit(false);
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />

      <div className={`todo-container ${toEdit ? "todo-container-edit" : "todo-container-noedit"}`} onClick={handleClickOnCard}>

        <label className="checkbox-container" onClick={(event) => event.stopPropagation()}>
          <input type="checkbox" defaultChecked={isChecked} onChange={handleCheckboxChange} className={`checkbox ${toEdit ? "checkbox-edit" : "checkbox-noedit"}`} />
        </label>

        <nav className="navigation">
          {toEdit && <button className="back" onClick={handleBackArrow}><span class="material-symbols-outlined">arrow_back_ios</span></button>}
          {toEdit && <button className="delete"><span class="material-symbols-outlined">delete</span></button>}
        </nav>

        <div className={`${isChecked ? "todo-done" : "todo"}`}>
          <p className="todo-title">{todo.title}</p>
          <p className="todo-content">{todo.content}</p>
          <p className="todo-date">{todoDate}</p>
        </div>

      </div>
    </>
  )
}

export default TodoCard;
