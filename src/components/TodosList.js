import React from "react"
import TodoItem from "./TodoItem"

const TodosList = props => {
  return (
    <div>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChange={props.handleChange}
          handleDelete={props.handleDelete}
        />
      ))}
    </div>
  )
}

export default TodosList
