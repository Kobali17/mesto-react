import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handelSetName(e) {
        setName(e.target.value);
    }

    function handelSetDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen}
                       title="Редактировать профиль"
                       popupId="edit" formId="profile-form">
            <input id="name" required placeholder="Имя" type="text" name="name" onChange={handelSetName}
                   className="popup__input"
                   minLength="2" maxLength="40"/>
            <span id="name-error" className="popup__input_error"/>
            <input id="job" required placeholder="О себе" type="text" name="job"
                   className="popup__input" onChange={handelSetDescription}
                   minLength="2" maxLength="200"/>
            <span id="job-error" className="popup__input_error"/>
            <button type="submit" className="popup__save-button">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditProfilePopup