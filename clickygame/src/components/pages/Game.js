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
                deck: nextProps.deck,
                cardsInPlay: nextProps.cardsInPlay,
                cardIDsClicked: nextProps.cardIDsClicked,
                numRight: nextProps.numRight,
                highScore: nextProps.highScore
            }
        );
    }

    componentDidMount() {
        // this.populateCards()
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
        this.setState({ cardIDsClicked: tempArr });

        let tempScore = this.state.numRight + 1;
        this.setState({ numRight: tempScore });
        this.props.changeGlobalState("numRight", tempScore);


        // remove card from cards in play and add to deck
        this.removeFromPlay(cardID)
        // pull from deck
        this.pullFromDeck()
        // shuffle cards in play
        this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
    }
    alreadyClicked = (cardID) => {
        //Check if highscore, change appropriately
        if (this.state.numRight > this.state.highScore) {
            let tempScore = this.state.numRight;
            this.setState({ highScore: tempScore });
            this.props.changeGlobalState("highScore", tempScore);
        }

            // let cardsInPlay = this.state.cardsInPlay;
            // let deck = this.state.deck.concat(cardsInPlay);
            // console.log(cardsInPlay)
            this.setState({
                // numRight: 0,
                cardIDsClicked: [],
                //cardsInPlay: [],
                //deck: deck
            });
            //this.props.changeGlobalState('deck', deck);
            this.props.changeGlobalState("RESET ALL", "all");
       
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
        deck.push(card[0])
        this.setState({ deck: deck })
        this.props.changeGlobalState('deck', deck);
    }

    render() {
        return (
            <CardContainer>
                <div className="row">
                    {this.state.cardsInPlay.map(cardObj => {
                        if (cardObj) {
                            return <Card
                                onClick={() => this.onCardClick(cardObj.card_id)}
                                key={cardObj.card_id}
                                cardid={cardObj.card_id}
                                image={cardObj.imgName}
                            />
                        }
                        return null
                    })}
                </div>

            </CardContainer>
        );
    }
}

export default Game;
