import "./TodoCard.css"
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { addTodo, updateTodo } from "services/todoService";
import type { TodoFromBackend } from "data/TodoFromBackend";
import type { AddTodo } from '../../data/AddTodo';


dayjs.extend(relativeTime);
interface TodoCardProps {
  todo: TodoFromBackend;
  handleDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, handleDelete }) => {

  console.log(todo);

  const [isChecked, setIsChecked] = useState(todo.done);
  const [toEdit, setToEdit] = useState(false);

  const todoDate = dayjs(todo.lastChange).fromNow();

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    // const updatedTodo = { ...todo };
    todo.done = event.target.checked;
    setIsChecked(todo.done);
    updateTodo(todo.id, todo);
  }

  function handleClickOnCard() {
    setToEdit(true);
  }

  function handleInputTitle(event: any) {
    const text = event.target.textContent || '';
    todo.title = text;
  }

  function handleInputContent(event: any) {
    const text = event.target.textContent || '';
    todo.content = text;
  }

  function handleBackArrow(event: React.MouseEvent) {
    event.stopPropagation();
    setToEdit(false);

    if (todo.id === '-1' && (todo.content !== '' || todo.title !== '')) {
      let newTodo: AddTodo = { content: todo.content, title: todo.title };
      addTodo(newTodo).then(res => todo = res);
    } else if (todo.content !== '' || todo.title !== '') {
      updateTodo(todo.id, todo).then(res => todo = res);
    }
  }

  function handleDeleteOnClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    handleDelete(todo.id);
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" rel="stylesheet" />

      <div className={`todo-container ${toEdit ? "todo-container-edit" : "todo-container-noedit"}`} onClick={handleClickOnCard}>

        <label className="checkbox-container" onClick={(event) => event.stopPropagation()}>
          <input type="checkbox" defaultChecked={isChecked} onChange={handleCheckboxChange} className={`checkbox ${toEdit ? "checkbox-edit" : "checkbox-noedit"}`} />
        </label>

        <nav className="navigation">
          {toEdit && <button className="back" onClick={handleBackArrow}><span className="material-symbols-outlined">arrow_back_ios</span></button>}
          {toEdit && <button className="delete" onClick={handleDeleteOnClick}><span className="material-symbols-outlined">delete</span></button>}
        </nav>

        <div className={`${isChecked ? "todo-done" : "todo"}`}>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            className="todo-title"
            onInput={handleInputTitle}
          >{todo.title}</div>
          <div
            contentEditable="true"
            suppressContentEditableWarning={true}
            className="todo-content"
            onInput={handleInputContent}
          >{todo.content}</div>
          <div className="todo-date">{todoDate}</div>
        </div>

      </div>
    </>
  )
}

export default TodoCard;
