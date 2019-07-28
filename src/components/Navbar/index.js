import React, { Component } from "react";
import Game from "../pages/Game"
import "./style.css";


function Navbar(props) {
    return (
        <nav>
            <div className="nav-wrapper">

                <ul className="brand-logo left">
                    <li className="">ClickyGame</li>
                </ul>
                <ul className="brand-logo center">
                    <li className="">Click the portal to start!</li>
                </ul>
                <ul className="brand-logo right">
                    <li className="">Correct: {props.numRight} | High: {props.highScore}</li>
                    {/* <li className="">Correct: {this.props.numRight } | High: {this.state.highScore ? this.state.highScore[0] : 0}</li> */}
                </ul>

            </div>
        </nav>
    );
}

// class Navbar extends Component {
// // constructor(props){
// //     super(props)
// //     this.state = {deck: nextProps.deck,
// //         cardsInPlay: nextProps.cardsInPlay,
// //         cardIDsClicked: nextProps.cardIDsClicked,
// //         numRight: nextProps.numRight,
// //         highScore: nextProps.highScore}
// // }
//     state = {
//         deck: [],
//         cardsInPlay: [],
//         cardIDsClicked: [],
//         numRight: 0,
//         highScore: 0
//     };

//     componentWillReceiveProps(nextProps) {
//         console.log(nextProps)
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
//        // M.AutoInit();
//     }
//     componentDidUpdate(prevProps) {
//         // Typical usage (don't forget to compare props):
//         if (this.props.numRight !== prevProps.numRight) {
//           this.fetchData(this.props.numRight);
//         }
//       }
// //compon
//     // shouldComponentUpdate(nextProps) {
//     //     const differentScore = this.props.numRight !== nextProps.numRight;
//     //     const differentHigh = this.props.highScore !== nextProps.highScore
//     //     return differentScore || differentHigh;
//     // }

//     // Depending on the current path, this component sets the "active" class on the appropriate navigation link item
//     render() {
//         return (
//             <nav>
//                 <div className="nav-wrapper">

//                     <ul className="brand-logo left">
//                         <li className="">ClickyGame</li>
//                     </ul>
//                     <ul className="brand-logo center">
//                         <li className="">Click an image to start!</li>
//                     </ul>
//                     <ul className="brand-logo right">
//                         <li className="">Correct: {this.props.numRight } | High: {this.props.numRight }</li>
//                         {/* <li className="">Correct: {this.props.numRight } | High: {this.state.highScore ? this.state.highScore[0] : 0}</li> */}
//                     </ul>

//                 </div>
//             </nav>
//         );
//     }
// }

export default Navbar;
