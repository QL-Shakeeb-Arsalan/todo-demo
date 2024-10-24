import { useState } from "react";
import "./App.css";

function App() {
  const [todoName, setTodoName] = useState("");
  const [editId, setIsEditId] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleTodoName = (e) => {
    setTodoName(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now().toString(),
      title: todoName,
      status: "active",
    };
    setTodoList((prevTodoList) => {
      return [...prevTodoList, newTodo];
    });
    setTodoName("");
  };

  const handleDelete = (id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => todo.id !== id);
    });
  };

  const handleComplete = (id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => ({
        ...todo,
        status: todo.id === id ? "done" : todo.status,
      }));
    });
  };

  const handleEdit = (id) => {
    setIsEditId(id);
    const title = todoList.find((todo) => todo.id === id).title;
    setTodoName(title);
  };

  const handleUpdate = () => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => ({
        ...todo,
        title: todo.id === editId ? todoName : todo.title,
      }));
    });
    setTodoName("");
    setIsEditId("");
  };

  return (
    <main className="main">
      <div className="container">
        <h1 className="heading">Todo App</h1>
        <div className="todo-field">
          <input
            type="text"
            className="search-box"
            placeholder="What need to done?"
            value={todoName}
            onChange={handleTodoName}
          />
          {
            todoName && (<button
              className="btn primary"
              type="button"
              onClick={editId ? handleUpdate : handleAddTodo}
            >
              {`${editId ? "Update" : "Add"} Todo`}
            </button>)
          }
          
        </div>
        
        <h3>Todo List</h3>
        <div>
          {todoList.length === 0 ? (
            <div className="todo-list no-todo">No Todo Added</div>
          ) : (
            todoList.map((todo) => (
              <div className="todo-list" key={todo.id}>
                <p
                  className={`todo-title ${
                    todo.status === "active" ? "" : "line-through"
                  }`}
                >
                  {todo.title}
                </p>
                <div className="action-btn">
                  <button
                    className="btn success"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn success"
                    onClick={() => handleComplete(todo.id)}
                  >
                    Done
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
