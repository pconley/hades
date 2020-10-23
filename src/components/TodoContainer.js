import React, { useState, useEffect } from "react"
import TodosList from "./TodosList"
import Header from "./Header"
import InputTodo from "./InputTodo"

import axios from "axios"
import uuid from "uuid"

import "../App.css"

const TodoContainer = props => {
  const [todos, setTodos] = useState([])
  const [show, setShow] = useState(false)

  const handleChange = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
    setShow(!show)
  }

  const delTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id
      }),
    ])
  }

  const addTodoItem = title => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  useEffect(() => {
    console.log("test run")
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => setTodos(response.data))
  }, [])

  return (
    <div className="container">
      <Header headerSpan={show} />
      <InputTodo handleAdd={addTodoItem} />
      <TodosList
        todos={todos}
        handleChange={handleChange}
        handleDelete={delTodo}
      />
    </div>
  )
}

export default TodoContainer
