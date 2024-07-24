import React, {useRef, useState} from "react";
import {Alert} from "@mui/material";

export default function CenterLayout({showIframe}) {
    let classIframe = showIframe === "" ? "iframe-center-none" : "iframe-center"
    const [isMounted, setIsMounted] = useState(false);
    const iframeRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")

    const handleIframeLoad = () => {
        setErrorMessage(
            'Si no puede acceder al contenido del iframe debido a políticas de origen cruzado u otros problemas, ' +
            'intente abrir el enlace en la nueva pestaña del navegador haciendo clic en el icono "abrir en una nueva pestaña".'
        )
    }

    return (
        <div className={"center-layout"}>
            {
                showIframe && (
                    <Alert>{errorMessage}</Alert>
                )
            }
            {showIframe && (
                <iframe id="center-iframe" ref={iframeRef} className={classIframe} src={showIframe}
                        onLoad={handleIframeLoad}/>
            )}
        </div>
    );
}