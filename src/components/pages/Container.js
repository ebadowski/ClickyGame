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
        highScore: 0,
        navMsg:"Click the portal to start!"
    };


    componentDidMount() {
        this.populateCards()
        M.AutoInit();
    }
    changeCardsInPlay = (arr) => {
        this.state.cardsInPlay = arr;
    }
    changeGlobalState = (key, val) => {
        if (key === "RESET ALL") {
            this.setState({
                numRight: 0,
                cardIDsClicked: [],
                //cardsInPlay: [],
               // deck: Deck
            });
           // this.populateCards()
        }
        else {
            //this.state[key] = val;
            this.setState({ [key]:val})
        }

        //this.render()
    }

    // used on load to fill cardsInPlay
    populateCards = () => {
        for (let i = 0; i < 9; i++) {
            this.pullFromDeck()
            this.render()
        }
    };

    // pulls card from deck AND adds it to cardsInPlay
    pullFromDeck = () => {
        let tempArr = this.state.cardsInPlay;
        let rand = Math.floor(Math.random() * this.state.deck.length);
        let cardObj = this.state.deck.splice(rand, 1);
        tempArr.push(cardObj[0]);
        // this.props.changeGlobalState("cardsInPlay", tempArr); //Should be a way that this gets updated with below statement?
        this.setState({ cardsInPlay: tempArr })
    }

    render() {
        return (
            <div>
                <Navbar numRight={this.state.numRight} highScore={this.state.highScore} navMsg={this.state.navMsg} />
                <Game {...this.state} changeGlobalState={this.changeGlobalState} populateCards={this.populateCards}/>

            </div>
        );
    }
}

export default Container;
