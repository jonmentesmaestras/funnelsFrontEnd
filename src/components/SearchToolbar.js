import React, {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RequestSvc from '../services/RequestSvc';
import {API, NAME_HEADER_AUTH} from "../utils/Constants";
import * as FunnelsSvc from "../services/FunnelsSvc";
import {getStoredValue} from "../services/UseLocalStorageSvc";

async function addTrack() {
    let addTrack = await FunnelsSvc.userTrack();
}

export default function SearchToolbar({setResults, closeSidebar, setIsLoading, searchDomain}) {
    const queryParameters = new URLSearchParams(window.location.search)
    // let userToken = queryParameters.get('token') ?? null
    let userToken = getStoredValue(NAME_HEADER_AUTH)
    const [valueInput, setInput] = useState(searchDomain ?? "")
    const [nameInput, setNameInput] = useState({})
    useEffect(() => {
        // addTrack()
        if (valueInput !== "") {
            onClickBtnSearch()
        }
    }, []);
    /*  INIT EVENTS */
    const onClickBtnSearch = async () => {
        if (closeSidebar) {
            closeSidebar()
        }
        if (valueInput === "") {
            nameInput.focus();
            return
        }
        setIsLoading(true)
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + userToken);
        let requestSvc = new RequestSvc();
        let resultSearch = await requestSvc.getRaw(API.FUNNELS_SITEMAP + valueInput + "&token=" + userToken);
        setResults(resultSearch)
        setIsLoading(false)
    }
    /*  END EVENTS  */
    return (
        <div className={"search-toolbar"}>
            <div className={"search-toolbar-wrapper-input"}>
                <input
                    ref={(input) => {
                        setNameInput(input)
                    }}
                    className={"search-toolbar-input"}
                    placeholder={"Escribe el Dominio. Ejemplo: settleitsoft.com"}
                    value={valueInput}
                    onChange={(e) => setInput(e.target.value)}
                />
                <IconButton aria-label="delete" clear
                            size="small" sx={{color: "#2196F3"}}
                            onClick={onClickBtnSearch}>
                    <SearchIcon fontSize="inherit"/>
                </IconButton>
            </div>
            {/*<button className={"search-toolbar-button"}>Enlaces guardados</button>*/}
        </div>
    );
}