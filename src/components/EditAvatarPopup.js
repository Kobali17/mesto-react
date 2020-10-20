import PopupWithForm from "./PopupWithForm";
import React from "react";


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар"
                       popupId="avatar-popup" formId="photo-form">
            <input ref={avatarRef} id="avatar-link" required placeholder="Ссылка на изображение" type="url"
                   name="link"
                   className="popup__input"/>
            <span id="avatar-link-error" className="popup__input_error"/>
            <button type="submit" className="popup__save-button">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup