import React from "react"
import Header from "./Header"
import TodosList from "./TodosList"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {

  state = {
    todos: [
      {
        id: uuidv4(),
        title: "Setup development environment",
        completed: true
      },
      {
        id: uuidv4(),
        title: "Develop website and add content",
        completed: false
      },
      {
        id: uuidv4(),
        title: "Deploy to live server",
        completed: false
      }
    ]
   };   
   
  handleChange = (id) => {
    console.log(`clicked ${id}`);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  handleDelete = id => {
    console.log("deleted", id);
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  handleAdd = title => {
    console.log("handleAdd", title);
    this.setState({
      todos: [...this.state.todos, { title, id: uuidv4(), completed: false }]
    });
  };

  render() {
    return (
      <div>
        <Header />
        <InputTodo handleAdd={this.handleAdd} />
        <TodosList
          todos={this.state.todos}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}
export default TodoContainer
