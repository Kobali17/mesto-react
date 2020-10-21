import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import DelCardPopup from "./DelCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api.js"
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function App() {

    const [currentUser, setUserData] = React.useState({
        name: '',
        about: '',
        avatar: ''
    });
    React.useEffect(() => {
        api.getUserData().then((res) => {
            setUserData(res)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const [isEditAvatarPopupOpen, isEditAvatarClickSet] = React.useState(false);
    const [isEditProfilePopupOpen, isEditProfilePopupOpenSet] = React.useState(false);
    const [isAddPlacePopupOpen, isAddPlacePopupOpenSet] = React.useState(false);
    const [isDelPopupOpen, isDelPopupOpenSet] = React.useState(false);
    const [selectedCard, selectedCardSet] = React.useState(null);
    const [delCard, delCardSet] = React.useState(null);

    function isPopupOpen() {
        return isEditAvatarPopupOpen ||
            isEditProfilePopupOpen ||
            isAddPlacePopupOpen ||
            isDelPopupOpen ||
            selectedCard != null
    }

    function handleCardClick(card) {
        selectedCardSet(card)
    }

    function handleDelClick(card) {
        delCardSet(card)
        isDelPopupOpenSet(true)
    }

    function handleEditAvatarClick() {
        isEditAvatarClickSet(true)
    }

    function handleEditProfileClick() {
        isEditProfilePopupOpenSet(true)
    }

    function handleAddPlaceClick() {
        isAddPlacePopupOpenSet(true)
    }

    function closeAllPopups() {
        isAddPlacePopupOpenSet(false)
        isEditAvatarClickSet(false)
        isEditProfilePopupOpenSet(false)
        isDelPopupOpenSet(false)
        selectedCardSet(null)
        delCardSet(null)
    }

    function handleUpdateUser(userData) {
        api.patchUserData(userData).then((res) => {
            setUserData(res);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(userData) {
        api.patchUserAvatar(userData).then((res) => {
            setUserData(res);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })

    }

    React.useEffect(() => {
        api.getInitialCards().then((res) => {
            setCards(res)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const [cards, setCards] = React.useState([]);


    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete() {
        api.delCard(delCard._id).then(() => {
            const newCards = cards.filter((c) => c._id !== delCard._id);
            setCards(newCards);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit(userCardData) {
        api.addUserCard(userCardData).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <Header/>

            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleDelClick}
                  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick} onDel={handleDelClick} onImage={handleCardClick}/>

            <Footer/>

            <EditProfilePopup inputText={currentUser} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups}/>

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen}
                             onClose={closeAllPopups}/>

            <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>

            <DelCardPopup onDelCard={handleCardDelete} isOpen={isDelPopupOpen} onClose={closeAllPopups}/>

            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>

            <div className={`overlay ${isPopupOpen() ? 'popup_opened' : ''}`}/>

        </CurrentUserContext.Provider>
    );
}

export default App;
