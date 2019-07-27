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
        this.props.changeGlobalState("cardsInPlay", tempArr); //Should be a way that this gets updated with below statement?
        this.setState({ cardsInPlay: tempArr })
    }

    onCardClick = (cardID) => {
        this.state.cardIDsClicked.includes(cardID) ? this.alreadyClicked(cardID) : this.notClicked(cardID);
    }
    notClicked = (cardID) => {
        //Changing state and props for cardIDsClicked and numRight
        let tempArr = this.state.cardIDsClicked;
        tempArr.push(cardID);
        this.props.changeGlobalState("cardIDsClicked", tempArr);
        this.state.numRight++;
        this.props.changeGlobalState("numRight", (this.state.numRight));
        this.setState({ cardIDsClicked: tempArr })

        // remove card from cards in play
        this.removeFromPlay(cardID)
        // reinsert card into deck
        // pull from deck
        // shuffle cards in play
        this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
    }
    alreadyClicked = (cardID) => {
        //Check if highscore, change appropriately
        // reset Game state
        //  numRight, cardIDsClicked, Deck, cardsInPlay
    }
    shuffleCards(target, arr) {
        arr.sort(() => Math.random() - 0.5);
        this.props.changeGlobalState(target, arr);
        this.setState({ [target]: arr })
    }
    removeFromPlay = (cardID) => {
        let cardsInPlay = this.state.cardsInPlay;
        let card = cardsInPlay.splice(cardsInPlay.findIndex(obj => obj.card_id === cardID), 1)
        this.setState({ cardsInPlay: cardsInPlay })
        this.props.changeGlobalState('cardsInPlay', cardsInPlay);

        let deck = this.state.deck;
        deck.push(card)
        this.setState({ deck: deck })
        this.props.changeGlobalState('deck', deck);
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
