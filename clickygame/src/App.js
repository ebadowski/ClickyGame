import React from "react";
//import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Game from "./components/pages/Game"


function App() {
  return (
    //<Router>
      <div>
        <Navbar />
        <Game />
      </div>
   // </Router>
  );
}

export default App;
