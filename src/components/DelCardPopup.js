import PopupWithForm from "./PopupWithForm";
import React from "react";


function DelCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDelCard();
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Вы уверены?"
                       popupId="del-popup">
            <button type="submit" className="popup__save-button">Да</button>
        </PopupWithForm>
    )
}

export default DelCardPopup