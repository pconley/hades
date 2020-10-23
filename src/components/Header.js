import React from "react"

const Header = props => {

  const headerStyle = {
    padding: "20px 0",
    lineHeight: "2em",
  }

  // const isInitialMount = useRef(true); // set initial value
  // console.log(isInitialMount);
    
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     // current is true on the first call from the
  //     // initial mount call above
  //     isInitialMount.current = false;
  //   } else {
  //     var x = Math.floor(Math.random() * 256)
  //     var y = Math.floor(Math.random() * 256)
  //     var z = Math.floor(Math.random() * 256)
  //     var bgColor = "rgb(" + x + "," + y + "," + z + ")"

  //     document.getElementById("inH1").innerHTML = "clicked";
  //     document.getElementById("inH1").style.backgroundColor = bgColor;
  //   }
  // }, [props.headerSpan]);
  
  return (
    <header style={headerStyle}>
      <h1 style={{ fontSize: "25px", marginBottom: "15px" }}>
        Simple Todo App
      </h1>
    </header>
  )
}

export default Header
