import React, { Component } from "react";
import { Card, CardContainer } from "../Card";
import Deck from "../../utils/Deck.json";
import M from "materialize-css";

class Game extends Component {
    state = {
        deck: Deck,
        cardsInPlay: [],
        cardIDsClicked: [],
        numRight: 0,
        highScore: 0
    };
    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                deck: nextProps.Deck,
                cardsInPlay: nextProps.cardsInPlay,
                cardIDsClicked: nextProps.cardIDsClicked,
                numRight: nextProps.numRight,
                highScore: nextProps.highScore
            }
        );
    }

    componentDidMount() {
        this.populateCards()
        M.AutoInit();
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
        this.setState({ cardsInPlay: tempArr })
    }

    onCardClick = (cardID) => {

    }

    render() {
        return (
            <CardContainer>
                {this.state.cardsInPlay.map(cardObj => (

                    <Card
                        //onClick={() => this.onCardClick(cardObj.id)}
                        key={cardObj.id}
                        image={cardObj.imgName}
                    />
                ))}
            </CardContainer>
        );
    }
}

export default Game;
