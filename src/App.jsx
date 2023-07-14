import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleRemove(task) {
    task.remove = true;
    const result = tasks.filter((task) => task.remove === false);
    setTasks(result);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        text: formJson.userInput,
        completed: false,
        remove: false,
      },
    ]);
    event.target.reset();
  }

  function handleOnChange(event) {
    let userInputLength = event.target.value.length;
    if (userInputLength === 250) {
      alert("Must be less than 250 characters");
    }
  }

  return (
    <>
      <h1>Todo Website</h1>
      <div className="container">
        <div className="user-input">
          <form onSubmit={(event) => handleSubmit(event)}>
            <button className="add-button" type="submit">
              Add
            </button>
            <label>
              <input
                className="input-field"
                name="userInput"
                type="text"
                placeholder="Add task"
                maxLength="250"
                onChange={(event) => handleOnChange(event)}
                required
              />
            </label>
          </form>
        </div>

        <div className="container-todo">
          {tasks.map((task) => (
            <div className="each-todo" key={task.id}>
              <input type="checkbox" />
              <p className="task">{task.text}</p>

              <button
                onClick={() => handleRemove(task)}
                className="remove-button"
              ></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
