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
        this.props.changeCardsInPlay(tempArr); //Should be a way that this gets updated with below statement?
        this.setState({ cardsInPlay: tempArr })
    }

    onCardClick = (cardID) => {
        console.log(cardID)
        //this.state.cardIDsClicked.contains(cardID) ? 1 : 0
    }

    render() {
        return (
            <CardContainer>
                <div className="row">
                    {this.state.cardsInPlay.map(cardObj => (

                        <Card
                            onClick={() => this.onCardClick(cardObj.card_id)}
                            key={cardObj.card_id}
                            cardid={cardObj.card_id}
                            image={cardObj.imgName}
                        />
                    ))}
                </div>

            </CardContainer>
        );
    }
}

export default Game;
