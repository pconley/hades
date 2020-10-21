import React from "react"

function TodoItem(props) {
  const { todo, handleChange, handleDelete } = props;
  const { id, completed, title } = todo
  const completedStyle = {
    fontStyle: "italic",
    color: "#d35e0f",
    opacity: 0.4,
    textDecoration: "line-through",
  }
  return (
    <li className="todo-item">
      <input 
        type="checkbox" 
        checked={completed}
        onChange={() => handleChange(id)}
      />
      <button onClick={() => handleDelete(id)}>Delete</button>
      <span style={completed ? completedStyle : null}>
        {title} [{id.slice(0,8)}]
      </span>
    </li>
  )
}

export default TodoItem