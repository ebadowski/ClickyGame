import React, { Component } from "react";
import Game from "../pages/Game"
import "./style.css";

class Navbar extends Component {
    // Depending on the current path, this component sets the "active" class on the appropriate navigation link item
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    
                    <ul className="brand-logo left">
                        <li className="">ClickyGame</li>
                    </ul>
                    <ul className="brand-logo center">
                        <li className="">Click an image to start!</li>
                    </ul>
                    <ul className="brand-logo right">
                        <li className="">Correct: {this.props.numRight ? this.props.numRight : 0} | High: {this.props.highScore ? this.props.highScore : 0}</li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Navbar;
