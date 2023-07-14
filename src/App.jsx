import { useState } from "react";
import "./App.css";
import binImage from "./assets/bin.png";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleRemove(index, clickedTask) {
    // FIXME(jan): same word will get remove
    tasks.splice(index, 1);
    const newTasks = tasks.filter((task) => task !== clickedTask);
    console.log(tasks.filter((task) => task !== clickedTask));
    setTasks(newTasks);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());

    setTasks([...tasks, formJson.userInput]);
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
                maxLength="250"
                onChange={handleOnChange}
                required
              />
            </label>
          </form>
        </div>

        <div className="container-todo">
          {tasks.map((task, index) => (
            <div className="each-todo" key={index}>
              <input type="checkbox" />
              <p className="task">{task}</p>

              <button
                onClick={() => handleRemove(index, task)}
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
