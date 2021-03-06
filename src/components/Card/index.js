import React from "react";
import "./style.css";

export function CardContainer({ children }) {
    return (
        <div className="card-container center-block">{children}</div>
    );
}

export function Card(props) {
    
    return (
        
            <div className="col 3">
                <div className="card circle">
                    <a href="#" {...props}>
                        <div className="card-image circle">
                            <img src={require('../images/'+props.image)} alt="" className="circle"/>
                        </div>
                    </a>
                </div>
            </div>

    );
}

