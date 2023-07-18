import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

const WORD_LIMIT = 100;
const ERROR_EMPTY_TASK = "Please enter a task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [countCompleted, setCountCompleted] = useState(0);

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

    setCountCompleted(getCompletedTaskCount(updatedTasks));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const userInput = form.userInput.value.trim();
    if (userInput.length === 0) {
      return alert(ERROR_EMPTY_TASK);
    }

    const newTask = {
      id: uuidv4(),
      text: userInput,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    form.reset();
  }

  function handleOnChange({ target }) {
    let userInputLength = target.value.length;
    if (userInputLength === WORD_LIMIT) {
      alert(`Must be less than ${WORD_LIMIT} characters`);
    }
  }

  function handleCheckBox({ target }, task) {
    const updatedTasks = [...tasks];
    const taskIndex = tasks.findIndex((item) => item.id === task.id);
    updatedTasks[taskIndex].completed = target.checked;
    setTasks(updatedTasks);
    setCountCompleted(getCompletedTaskCount(updatedTasks));
  }

  function getCompletedTaskCount(taskList) {
    return taskList.reduce(
      (count, task) => (task.completed ? count + 1 : count),
      0,
    );
  }

  return (
    <>
      <h1>Todo Website</h1>
      <div className="completed-count">
        <p>
          Completed: {countCompleted}/{tasks.length}
        </p>
      </div>
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
                maxLength={WORD_LIMIT}
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
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
