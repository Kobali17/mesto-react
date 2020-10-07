import React from "react";
import api from "../utils/Api.js"
import Card from "./Card";

function Main(props) {
    const [userData, setUserData] = React.useState({userName: '', userAvatar: '', userDescription: ''});
    api.getUserData().then((res) => {
        setUserData({userName: res.name, userAvatar: res.avatar, userDescription: res.about})
    }).catch((err) => {
        console.log(err);
    })

    const [cards, setCards] = React.useState([]);
    api.getInitialCards().then((res) => {
        setCards(res)
    }).catch((err) => {
        console.log(err);
    })

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__first">
                    <div className="profile__avatar" style={{backgroundImage: `url(${userData.userAvatar})`}}>
                        <button className="profile__avatar-edit-button" onClick={props.onEditAvatar} type="button"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userData.userName}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile} type="button"/>
                        <p className="profile__job">{userData.userDescription}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-card-button" onClick={props.onAddPlace}/>
            </section>
            <section className="photo-grid">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onDel={props.onDel} onImage={props.onImage}/>
                ))}
                }
            </section>
        </main>
    )
}

export default Main