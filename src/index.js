import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Scrollable from "./Components/Scrollable";

function App() {
  return <Scrollable>aaaa</Scrollable>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
