import React from "react";

function Card(props) {


    return (
        <div key={props.card._id} className="card">
            <button type="button" className="card__del-button" onClick={props.onDel}/>
            <img className="card__img" onClick={() => {
                props.onImage(props.card)
            }} src={props.card.link} alt={props.card.text}/>
            <div className="card__info">
                <h3 className="card__text">{props.card.name}</h3>
                <div className="card__like-container">
                    <button type="button" className="card__like-button"/>
                    <p className="card__like-data">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card