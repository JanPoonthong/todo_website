import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    setTasks([...tasks, formJson.userInput]);
  }

  return (
    <>
      <h1>Todo Website</h1>
      <div className="container">
        <div className="user-input">
          <form onSubmit={handleSubmit}>
            <button className="add-button" type="submit">
              +
            </button>
            <label>
              <input className="input-field" name="userInput" type="text" />
            </label>
          </form>
        </div>

        <div>
          <div className="each-todo">
            {tasks.map((task, index) => (
              <div key={index}>
                <input type="checkbox" />
                <p className="task">{task}</p>
                <button>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
