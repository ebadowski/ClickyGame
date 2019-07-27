import React from "react";
import 'materialize-css/dist/css/materialize.min.css';
//import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Game from "./components/pages/Game";
import Container from "./components/pages/Container"


function App() {
  return (
    //<Router>
      <Container>
        {/* <Navbar />
        <Game /> */}
      </Container>
   // </Router>
  );
}

export default App;
