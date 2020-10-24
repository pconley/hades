import axios from "axios"
import React, { useEffect } from "react"

const AboutPage = props => {

  const url = 'http://52.149.174.55:8000/';

  useEffect(() => {
    axios
      .get(url)
      .then(response => console.log(response))
  }, [])

  return (
    <div>
      <h2 className="header">About</h2>
      <ul>
        <li>10-24a : added sample user cards</li>
      </ul>
    </div>
  )
}

export default AboutPage
