import PopupWithForm from "./PopupWithForm";
import React from "react";


function DelCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDelCard();
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Вы уверены?"
                       popupId="del-popup" buttonText="Да">
        </PopupWithForm>
    )
}

export default DelCardPopup