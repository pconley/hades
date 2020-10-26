import React from "react"
import Button from 'react-bootstrap/Button';
import { Animate } from 'react-move';

class MotionPage extends React.Component {

  constructor(...args) {
    super(...args)
    this.state = {
      position: 'absolute',
      top: 20, left: 20,
      width: 50, height: 50,
      border: "1px solid #73AD21",
    }
  }

  move = (x) => { this.setState({ top: this.state.top+x, left: this.state.left+x })}

  render() {

    const speed = 0.5;

    const { move, state } = this

    const containerStyle = {
      position: 'relative',
      top: 30, left: 30,
      width: 400, height: 300,
      border: "3px solid #73AD21",
    };

    return (
      <div>
        <h2 className="header">Motion Experiment</h2>
        <p>Use react-motion to explore smooth annimation.</p>
        <Button onClick={() => move(20)}>Move Down/Right</Button>
        <Button onClick={() => move(-20)}>Move Up/Left</Button>
        <p>{this.state.top}, {this.state.left}</p>
        <div style={containerStyle}>

          <Animate
            start = {state}
            update = {{ ...state, transition: `top ${speed}s, left ${speed}s`}}
          >
            {data => {
              console.log("data", data);
              return <div style={{...data, color: 'red'}}>mover</div>
            }}
          </Animate>

        </div>
      </div>
    )
  }
}

export default MotionPage
