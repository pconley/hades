import React from "react"
import TodoItem from "./TodoItem"

class TodosList extends React.Component {

  render() {
    return (
      <div>
        {this.props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleChange={this.props.handleChange}
            handleDelete={this.props.handleDelete}
            handleAdd={this.props.handleAdd}
          />
        ))}
      </div>
    )
  }
}
export default TodosList
