import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  function handleRemove(task) {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    const newTask = {
      id: uuidv4(),
      text: formJson.userInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    event.target.reset();
  }

  function handleOnChange(event) {
    let userInputLength = event.target.value.length;
    const wordLimit = 100;
    if (userInputLength === wordLimit) {
      alert(`Must be less than ${wordLimit} characters`);
    }
  }

  function handleCheckBox(event, task) {
    const updatedTasks = [...tasks];
    const taskIndex = tasks.findIndex((item) => item.id === task.id);
    if (event.target.checked) {
      updatedTasks[taskIndex].completed = true;
    } else {
      updatedTasks[taskIndex].completed = false;
    }
    setTasks(updatedTasks);
  }

  return (
    <>
      <h1>Todo Website</h1>
      <div className="container">
        <div className="user-input">
          <form onSubmit={handleSubmit}>
            <button className="add-button" type="submit">
              Add
            </button>
            <label>
              <input
                className="input-field"
                name="userInput"
                type="text"
                placeholder="Add task"
                maxLength="100"
                onChange={handleOnChange}
                required
              />
            </label>
          </form>
        </div>

        <div className="container-todo">
          {tasks.map((task, index) => (
            <div className="each-todo" key={task.id}>
              <p>{index + 1}.</p>
              <ol>
                <li>
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(event) => handleCheckBox(event, task)}
                    checked={task.completed}
                  />
                  <del className="task">{task.text}</del>
                  <button
                    onClick={() => handleRemove(task)}
                    className="remove-button"
                  ></button>
                </li>
                {/* <p className="task">{task.text}</p> */}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
