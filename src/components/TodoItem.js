import React, { Component } from "react"

class TodoItem extends Component {

  componentWillUnmount() {
    alert("Item about to be deleted!");
  }

  render() {
    const { todo, handleChange, handleDelete } = this.props;
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
          {title} [{id}]
        </span>
      </li>
    )
  }
}

export default TodoItem
