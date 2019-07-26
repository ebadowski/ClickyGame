import React, { Component } from "react";
import { Card, CardContainer } from "../Card";
import Deck from "../../utils/Deck.json";
import M from "materialize-css";
import Navbar from "../Navbar";

import Game from "./Game";

class Container extends Component {
    state = {
        deck: Deck,
        cardsInPlay: [],
        cardIDsClicked: [],
        numRight: 0,
        highScore: 0
    };


    componentDidMount() {
        
        M.AutoInit();
    }
    changeCardsInPlay = (arr) => {
        this.state.cardsInPlay = arr;
    }


    render() {
        return (
            <div>
                <Navbar {...this.state}/>
        <Game {...this.state} changeCardsInPlay={this.changeCardsInPlay}/>
            </div>
        );
    }
}

export default Container;
