import React, { Component } from "react";
import { Card, CardContainer } from "../Card";
import Deck from "../../utils/Deck.json";
import M from "materialize-css";
import { Motion, StaggeredMotion, spring } from 'react-motion';
import range from 'lodash/range';

// Components 

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 150;
const CHILD_BUTTON_DIAM = 100;
// The number of child buttons that fly out from the main button
const NUM_CHILDREN = 9;
// Hard code the position values of the mainButton
const M_X = 100;
const M_Y = 100;

//should be between 0 and 0.5 (its maximum value is difference between scale in finalChildButtonStyles a
// nd initialChildButtonStyles)
const OFFSET = 0.05;

const SPRING_CONFIG = { stiffness: 400, damping: 28 };

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 250,
    SEPARATION_ANGLE = 40, //degrees
    FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
    BASE_ANGLE = ((180 - FAN_ANGLE) / 2); // degrees

// Names of icons for each button retreived from fontAwesome, we'll add a little extra just in case 
// the NUM_CHILDREN is changed to a bigger value
let childButtonIcons = ['pencil', 'at', 'camera', 'bell', 'comment', 'bolt', 'ban', 'code'];


// Utility functions

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

function finalChildDeltaPositions(index) {
    let angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM / 2),
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM / 2)
    };
}


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            childButtons: [],
            deck: Deck,
            cardsInPlay: [],
            cardIDsClicked: [],
            numRight: 0,
            highScore: 0,
            width: 0, 
            height: 0
        };

        // Bind this to the functions
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
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
        //window.addEventListener('click', this.closeMenu);
        let childButtons = [];

        this.setState({ childButtons: childButtons.slice(0) });
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        //window.removeEventListener('click', this.closeMenu);
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    updateWindowDimensions() {
        this.setState({ width:( window.innerWidth /2), height:( window.innerHeight /2) });
      }





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
        //this.closeMenu()
        this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
       // this.openMenu()
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
        this.closeMenu()
        this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
        //this.animateCards()
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








    //////////////////////////////////////
    //////////// ANIMATION FUNCTIONS /////
    //////////////////////////////////////

    mainButtonStyles() {
        return {
            width: MAIN_BUTTON_DIAM,
            height: MAIN_BUTTON_DIAM,
            top: this.state.height - (MAIN_BUTTON_DIAM / 2),
            left: this.state.width - (MAIN_BUTTON_DIAM / 2)
        };
    }

    initialChildButtonStyles() {
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: spring(this.state.height - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            left: spring(this.state.width - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            rotate: spring(-180, SPRING_CONFIG),
            scale: spring(0.5, SPRING_CONFIG)
        };
    }

    initialChildButtonStylesInit() {
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: this.state.height - (CHILD_BUTTON_DIAM / 2),
            left: this.state.width - (CHILD_BUTTON_DIAM / 2),
            rotate: -180,
            scale: 0.5
        };
    }

    finalChildButtonStylesInit(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: this.state.height - deltaY,
            left: this.state.width + deltaX,
            rotate: 0,
            scale: 1
        };
    }

    finalChildButtonStyles(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: spring(this.state.height - deltaY, SPRING_CONFIG),
            left: spring(this.state.width + deltaX, SPRING_CONFIG),
            rotate: spring(0, SPRING_CONFIG),
            scale: spring(1, SPRING_CONFIG)
        };
    }

    toggleMenu(e) {
        e.stopPropagation();
        let { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
        //remove toggle classes
    }

    closeMenu() {
        this.setState({ isOpen: false });
    }
    openMenu() {
        this.setState({ isOpen: true });
    }

    renderChildButtons() {
        const { isOpen } = this.state;
        const targetButtonStylesInitObject = range(NUM_CHILDREN).map(i => {
            return isOpen ? this.finalChildButtonStylesInit(i) : this.initialChildButtonStylesInit();
        });

        //StaggeredMotion now takes an Array of object
        const targetButtonStylesInit = Object.keys(targetButtonStylesInitObject).map(key => targetButtonStylesInitObject[key]);

        const targetButtonStyles = range(NUM_CHILDREN).map(i => {
            return isOpen ? this.finalChildButtonStyles(i) : this.initialChildButtonStyles();
        });

        const scaleMin = this.initialChildButtonStyles().scale.val;
        const scaleMax = this.finalChildButtonStyles(0).scale.val;

        //This function returns target styles for each child button in current animation frame
        //according to actual styles in previous animation frame.
        //Each button could have one of two target styles
        // - defined in initialChildButtonStyles (for collapsed buttons)
        // - defined in finalChildButtonStyles (for expanded buttons)
        // To decide which target style should be applied function uses css 'scale' property
        // for previous button in previous animation frame.
        // When 'scale' for previous button passes some 'border' which is a simple combination one of
        // two 'scale' values and some OFFSET the target style for next button should be changed.
        //
        // For example let's set the OFFSET for 0.3 - it this case border's value for closed buttons will be 0.8.
        //
        // All buttons are closed
        //                INITIAL-BUTTON-SCALE-(0.5)-----------BORDER-(0.8)------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------------------|--------------------------------|
        // BUTTON NO 1    o------------------------------------------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        // When user clicks on menu button no 1 changes its target style according to finalChildButtonStyles method
        // and starts growing up. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was in previous animation frame
        // BUTTON NO 1    -----------------------------------o-------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed.
        // BUTTON NO 1    -------------------------------------------|-o-------------------------------
        // BUTTON NO 2    -----o-------------------------------------|---------------------------------
        //
        //
        // All buttons are expanded - in this case border value is 0.7 (OFFSET = 0.3)
        //                INITIAL-BUTTON-SCALE-(0.5)---BORDER-(0.7)--------------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------|--------------------------------------------|
        // BUTTON NO 1    -------------------------------|--------------------------------------------O
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        // When user clicks on menu button no 1 changes its target style according to initialChildButtonStyles method
        // and starts shrinking down. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was defined in finalChildButtonStyles method
        // BUTTON NO 1    -------------------------------|------------------------------------O--------
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed
        // and this button starts to animate to its default state.
        // BUTTON NO 1    -----------------------------o-|---------------------------------------------
        // BUTTON NO 2    -------------------------------|------------------------------------O--------
        let calculateStylesForNextFrame = prevFrameStyles => {
            prevFrameStyles = isOpen ? prevFrameStyles : prevFrameStyles.reverse();

            let nextFrameTargetStyles = prevFrameStyles.map((buttonStyleInPreviousFrame, i) => {
                //animation always starts from first button
                if (i === 0) {
                    return targetButtonStyles[i];
                }

                const prevButtonScale = prevFrameStyles[i - 1].scale;
                const shouldApplyTargetStyle = () => {
                    if (isOpen) {
                        return prevButtonScale >= scaleMin + OFFSET;
                    } else {
                        return prevButtonScale <= scaleMax - OFFSET;
                    }
                };

                return shouldApplyTargetStyle() ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
            });

            return isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse();
        };

        return (
            <StaggeredMotion
                defaultStyles={targetButtonStylesInit}
                styles={calculateStylesForNextFrame}>
                {interpolatedStyles =>
                    <div>
                        {interpolatedStyles.map(({ height, left, rotate, scale, top, width }, index) => {
                            if (this.state.cardsInPlay[index]) {
                                console.log(this.state.cardsInPlay)
                                return <div
                                    className="child-button circle"
                                    key={index}
                                    style={{
                                        left,
                                        height,
                                        top,
                                        transform: `rotate(${rotate}deg) scale(${scale})`,
                                        width
                                    }}
                                >
                                    {/* <i className={"fa fa-" + childButtonIcons[index] + " fa-lg"}></i> */}
                                    <Card
                                        onClick={() => this.onCardClick(this.state.cardsInPlay[index].card_id)}
                                        key={this.state.cardsInPlay[index].card_id}
                                        cardid={this.state.cardsInPlay[index].card_id}
                                        image={this.state.cardsInPlay[index].imgName}
                                        className="playing-card circle"
                                        style={{ padding: 0, top: "", left: "" }}
                                    />
                                </div>
                            } else { return null }
                        }
                        )}
                    </div>
                }
            </StaggeredMotion>
        );
    }

    render() {
        let { isOpen } = this.state;
        let mainButtonRotation =
            isOpen ? { rotate: spring(0, { stiffness: 500, damping: 30 }) } : { rotate: spring(-135, { stiffness: 500, damping: 30 }) };
        return (
            <CardContainer>
                {this.renderChildButtons()}
                <Motion style={mainButtonRotation}>
                    {({ rotate }) =>
                        <div
                            className="main-button center"
                            style={{ ...this.mainButtonStyles(), transform: `rotate(${rotate}deg)` }}
                            onClick={this.toggleMenu}>
                            {/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
                            <i className="fa fa-close fa-3x" />
                        </div>
                    }
                </Motion>
            </CardContainer>
        );
    }
};


// class Game extends Component {
//     state = {
//         deck: Deck,
//         cardsInPlay: [],
//         cardIDsClicked: [],
//         numRight: 0,
//         highScore: 0
//     };

//     componentWillReceiveProps(nextProps) {
//         this.setState(
//             {
//                 deck: nextProps.deck,
//                 cardsInPlay: nextProps.cardsInPlay,
//                 cardIDsClicked: nextProps.cardIDsClicked,
//                 numRight: nextProps.numRight,
//                 highScore: nextProps.highScore
//             }
//         );
//     }

//     componentDidMount() {
//         // this.populateCards()
//         M.AutoInit();
//     }



//     // used on load to fill cardsInPlay
//     populateCards = () => {
//         for (let i = 0; i < 9; i++) {
//             this.pullFromDeck()
//             this.render()
//         }
//     };

//     // pulls card from deck AND adds it to cardsInPlay
//     pullFromDeck = () => {
//         let tempArr = this.state.cardsInPlay;
//         let rand = Math.floor(Math.random() * this.state.deck.length);
//         let cardObj = this.state.deck.splice(rand, 1);
//         tempArr.push(cardObj[0]);
//         this.props.changeGlobalState("cardsInPlay", tempArr); //Should be a way that this gets updated with below statement?
//         this.setState({ cardsInPlay: tempArr })
//     }

//     onCardClick = (cardID) => {
//         this.state.cardIDsClicked.includes(cardID) ? this.alreadyClicked(cardID) : this.notClicked(cardID);
//     }
//     notClicked = (cardID) => {
//         //Changing state and props for cardIDsClicked and numRight
//         let tempArr = this.state.cardIDsClicked;
//         tempArr.push(cardID);
//         this.props.changeGlobalState("cardIDsClicked", tempArr);
//         this.setState({ cardIDsClicked: tempArr });

//         let tempScore = this.state.numRight + 1;
//         this.setState({ numRight: tempScore });
//         this.props.changeGlobalState("numRight", tempScore);


//         // remove card from cards in play and add to deck
//         this.removeFromPlay(cardID)
//         // pull from deck
//         this.pullFromDeck()
//         // shuffle cards in play
//         this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
//     }
//     alreadyClicked = (cardID) => {
//         //Check if highscore, change appropriately
//         if (this.state.numRight > this.state.highScore) {
//             let tempScore = this.state.numRight;
//             this.setState({ highScore: tempScore });
//             this.props.changeGlobalState("highScore", tempScore);
//         }

//             // let cardsInPlay = this.state.cardsInPlay;
//             // let deck = this.state.deck.concat(cardsInPlay);
//             // console.log(cardsInPlay)
//             this.setState({
//                 // numRight: 0,
//                 cardIDsClicked: [],
//                 //cardsInPlay: [],
//                 //deck: deck
//             });
//             //this.props.changeGlobalState('deck', deck);
//             this.props.changeGlobalState("RESET ALL", "all");
//             //this.shuffleCards('cardsInPlay', this.state.cardsInPlay)
//             this.animateCards()
//     }
//     shuffleCards(target, arr) {
//         arr.sort(() => Math.random() - 0.5);
//         this.props.changeGlobalState(target, arr);
//         this.setState({ [target]: arr })
//     }
//     removeFromPlay = (cardID) => {
//         let cardsInPlay = this.state.cardsInPlay;
//         let card = cardsInPlay.splice(cardsInPlay.findIndex(obj => obj.card_id === cardID), 1)
//         this.setState({ cardsInPlay: cardsInPlay })
//         this.props.changeGlobalState('cardsInPlay', cardsInPlay);

//         let deck = this.state.deck;
//         deck.push(card[0])
//         this.setState({ deck: deck })
//         this.props.changeGlobalState('deck', deck);
//     }
//     animateCards(){
//             // var elem = document.getElementsByClassName("playing-card");  
//             // console.log(elem) 
//             // var pos = 0;
//             // var id = setInterval(frame, 5);
//             // function frame() {
//             //     for (let i in elem){
//             //         if (pos == 350) {
//             //             clearInterval(id);
//             //           } else {
//             //             pos++; 
//             //             elem[i].style.top = pos + "px"; 
//             //             elem[i].style.left = pos + "px"; 
//             //           }
//             //     }

//             // }
//           }

//     render() {
//         return (
//             <CardContainer>
//                 <div className="row">
//                     {this.state.cardsInPlay.map(cardObj => {
//                         if (cardObj) {
//                             return <Card
//                                 onClick={() => this.onCardClick(cardObj.card_id)}
//                                 key={cardObj.card_id}
//                                 cardid={cardObj.card_id}
//                                 image={cardObj.imgName}
//                                 className="playing-card"
//                                 style = {{padding: 0, top: "", left:""}}
//                             />
//                         }
//                         return null
//                     })}
//                 </div>

//             </CardContainer>
//         );
//     }
// }

export default Game;
