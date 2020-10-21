import React from "react"

function TodoItem(props) {
  const { todo, handleChange, handleDelete } = props;
  const { id, completed, title } = todo
  return (
    <li>
      <input 
        type="checkbox" 
        checked={completed}
        onChange={() => handleChange(id)}
      />
      <button onClick={() => handleDelete(id)}>Delete</button>
      {title} [{id.slice(0,8)}]
    </li>
  )
}

export default TodoItem