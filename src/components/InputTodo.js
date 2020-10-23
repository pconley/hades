import React, { useState } from "react"

const InputTodo = props => {

  // single field example
  // const [title, setTitle] = useState("")
  // const onChange = e => {
  //   setTitle(e.target.value)
  // }

  // multiple fields example
  const [inputFields, setInputFields] = useState({
    title: "", // a field with name as in the input
  })
  const onChange = e => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // props.handleAdd(title)
    // setTitle("")
    props.handleAdd(inputFields.title);
    // then clear the field
    setInputFields({ title: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        // value={title}
        value={inputFields.title}
        name="title"
        onChange={onChange}
      />
      <input type="submit" className="input-submit" value="Submit" />
    </form>
  )
}

export default InputTodo
