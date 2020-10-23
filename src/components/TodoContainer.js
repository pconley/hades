import React from "react"
import Header from "./Header"
import TodosList from "./TodosList"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "../App.css"

class TodoContainer extends React.Component {

  state = {
    todos: [],
    state: false,
   };   
   
  handleChange = (id) => {
    console.log(`clicked ${id}`);
    this.setState({
      show: !this.state.show,
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  deleteTodoItem = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(reponse =>
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id),
        })
      )
  }

  addTodoItem = title => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then(response =>
        this.setState({
          todos: [...this.state.todos, response.data],
        })
      )
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => this.setState({ todos: response.data }));
  }

  render() {
    return (
      <div className="container">
        <Header  headerSpan={this.state.show} />
        <InputTodo handleAdd={this.addTodoItem} />
        <TodosList
          todos={this.state.todos}
          handleChange={this.handleChange}
          handleDelete={this.deleteTodoItem}
        />
      </div>
    )
  }
}
export default TodoContainer
