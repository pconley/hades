import React, { Component } from "react"

class InputTodo extends Component {
  
  state = {
    title: ""
  };

  onChange = e => {
    console.log(`change ${e.target.name}=${e.target.value}`, e.target);
    this.setState({
      // this works for various fields
      [e.target.name]: e.target.value
      // for title it is the same as...
      // title: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAdd(this.state.title);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Add new todo here..."
          value={this.state.title}
          name="title"
          onChange={this.onChange}
        />
        <input type="submit" className="input-submit" value="Submit" />
      </form>
    )
  }
}
export default InputTodo
