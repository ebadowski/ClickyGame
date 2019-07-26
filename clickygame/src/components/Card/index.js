import React from "react";
import "./style.css";

export function CardContainer({ children }) {
    return (
        <div className="card-container">{children}</div>
    );
}

export function Card(props) {
    //return <li className="list-group-item">{children}</li>;
    return (
        // <div>
        //     <img className="playing-card" {...props} src={props.image} alt=""></img>
        // </div>
        <div
        className="card"
        style={{
          backgroundImage: props.image ? `url(`+require('../images/'+props.image)+`)` : "none",
          height: "300px",
          width: "300px"
        }}
      ></div>
    );
}

