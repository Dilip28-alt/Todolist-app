import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState(""); // current input
  const [tasks, setTasks] = useState([]); // all tasks
  const [editIndex, setEditIndex] = useState(null); // track task being edited

  // Add or Update task
  const saveTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // Editing existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Adding new task
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask(""); // clear input
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit task
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // Toggle completion
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      {/* Input + Save button */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={saveTask}>{editIndex !== null ? "Update" : "Add"}</button>

      {/* Task list */}
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {t.text}
            </span>

            <button onClick={() => editTask(index)}>✏️</button>
            <button onClick={() => deleteTask(index)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
