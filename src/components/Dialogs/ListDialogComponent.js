import React from "react";

export default function ListDialogComponent(
    {
        setOpenDialog,
        image,
        content,
        onClose
    }) {
    const handleClick = () => {
        if (onClose) {
            onClose()
        }
        if (setOpenDialog) {
            setOpenDialog(false)
        }
    }
    return (
        <div className={"dialog-main-layout"}>
            <div className={"list-dialog-content"}>
                {image && (
                    <div className={"list-dialog-header"}>
                        <img src={image} alt={"Logo clic spy"}/>
                    </div>
                )}
                <div className={"list-dialog-body"}>
                    <ul>
                        {content.map(function (texto) {
                            return (
                                <li className={"list-dialog-li"}><p
                                    className={"list-dialog-text-message"}>{texto}</p></li>
                            )
                        })}
                    </ul>
                </div>
                <button className={"list-dialog-button"} onClick={handleClick}>Cerrar</button>
            </div>
        </div>
    );

}