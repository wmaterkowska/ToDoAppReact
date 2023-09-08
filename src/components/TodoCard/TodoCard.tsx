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
    <div className={`todo-container ${toEdit ? "todo-container-edit" : "todo-container-noedit"}`} onClick={handleClickOnCard}>
      {toEdit && <button className="back" onClick={handleBackArrow}>--</button>}
      <div className={`${isChecked ? "todo-done" : "todo"}`}>
        <p className="todo-title">{todo.title}</p>
        <p className="todo-content">{todo.content}</p>
        <p className="todo-date">{todoDate}</p>
      </div>
      <label onClick={(event) => event.stopPropagation()}>
        <input type="checkbox" defaultChecked={isChecked} onChange={handleCheckboxChange} />
      </label>
      {toEdit && <button className="delete">delete</button>}
    </div>
  )
}

export default TodoCard;
