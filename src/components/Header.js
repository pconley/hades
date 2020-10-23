import React, { Component } from "react"

class Header extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.headerSpan !== this.props.headerSpan) {
      const x = Math.floor(Math.random() * 256);
      const y = Math.floor(Math.random() * 256);
      const z = Math.floor(Math.random() * 256);
      const bgColor = "rgb(" + x + "," + y + "," + z + ")";
      // console.log("props change", bgColor);
      document.getElementById("inH1").innerHTML = "clicked";
      document.getElementById("inH1").style.backgroundColor = bgColor;
    }
  }

  render() {
    const headerStyle = {
      padding: "20px 0",
      lineHeight: "2em",
    }
    return (
      <header style={headerStyle}>
        <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
          Simple Todo App <span id="inH1"></span>
        </h1>
        <p style={{ fontSize: "19px" }}>
          Please add to-dos item(s) through the input field
        </p>
      </header>
    )
  }
}

export default Header
