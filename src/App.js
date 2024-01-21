import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editId, setEditId] = useState(0);
  console.log(todos);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const existing = todos.find((item) => {
        return item.id === editId;
      });

      const updatedTodo = todos.map((t) =>
        t.id === existing.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodo);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo.trim() !== "") {
      const newTodo = { id: Date.now(), todo };
      setTodos([newTodo, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    console.log(delTodo);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div className="container">
        <h3>Add todo</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>

        <ul>
          {todos.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.todo}</span>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
