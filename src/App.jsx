import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [text, setText] = useState("")

  return (
    <>
        <div className="container">
            <div className="user-input">
                <button className="add-button">+</button>
                <input className="" type="text"></input>
            </div>

            <div>
                <div className="each-todo">
                    <p className="task">Hello</p>
                    <button>X</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
