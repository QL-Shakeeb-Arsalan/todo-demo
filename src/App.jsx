import { useState } from "react";
import "./App.css";

function App() {
  const [todoName, setTodoName] = useState("");
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
  

  return (
    <main className="main">
      <div className="container">
        <h1>Todo List</h1>
        <div>
          {todoList.length === 0 ? (
            <div className="todo-list">No Todo Added</div>
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

        <div className="todo-field">
          <input
            type="text"
            className="search-box"
            placeholder="What need to done?"
            value={todoName}
            onChange={handleTodoName}
          />
          <button className="btn primary" type="button" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
