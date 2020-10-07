import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";


function App() {
    const [isEditAvatarPopupOpen, isEditAvatarClickSet] = React.useState(false);
    const [isEditProfilePopupOpen, isEditProfilePopupOpenSet] = React.useState(false);
    const [isAddPlacePopupOpen, isAddPlacePopupOpenSet] = React.useState(false);
    const [isDelPopupOpen, isDelPopupOpenSet] = React.useState(false);
    const [selectedCard, selectedCardSet] = React.useState(null);

    function handleCardClick(card) {
        console.log(card)
        selectedCardSet(card)
    }

    function handelDelClick() {
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

    }

    return (
        <>
            <Header/>
            <Main onEditProfile={handleEditAvatarClick} onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditProfileClick} onDel={handelDelClick} onImage={handleCardClick}/>
            <Footer/>
            <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} title="Редактировать профиль"
                           popupId="edit" formId="profile-form">
                <input id="name" required placeholder="Имя" type="text" name="name" className="popup__input"
                       minLength="2" maxLength="40"/>
                <span id="name-error" className="popup__input_error"/>
                <input id="job" required placeholder="О себе" type="text" name="job"
                       className="popup__input"
                       minLength="2" maxLength="200"/>
                <span id="job-error" className="popup__input_error"/>
                <button type="submit" className="popup__save-button">Сохранить</button>
            </PopupWithForm>


            <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} title="Новое место" popupId="photo-add"
                           formId="photo-form">
                <input id="place" required placeholder="Название" type="text" name="place"
                       className="popup__input"
                       minLength="1" maxLength="30"/>
                <span id="place-error" className="popup__input_error"/>
                <input id="link" required placeholder="Ссылка на картинку" type="url" name="link"
                       className="popup__input"/>
                <span id="link-error" className="popup__input_error"/>
                <button type="submit" className="popup__save-button">Создать</button>
            </PopupWithForm>


            <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} title="Обновить аватар"
                           popupId="avatar-popup" formId="photo-form">
                <input id="avatar-link" required placeholder="Ссылка на изображение" type="url"
                       name="link"
                       className="popup__input"/>
                <span id="avatar-link-error" className="popup__input_error"/>
                <button type="submit" className="popup__save-button">Сохранить</button>
            </PopupWithForm>

            <PopupWithForm onClose={closeAllPopups} isOpen={isDelPopupOpen} title="Вы уверены?" popupId="del-popup">
                <button type="submit" className="popup__save-button">Да</button>
            </PopupWithForm>

            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
            <div className="overlay"/>

        </>
    );
}

export default App;
