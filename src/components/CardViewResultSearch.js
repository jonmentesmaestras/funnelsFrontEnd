import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as React from "react";
import {useState} from "react";

export default function CardViewResultSearch(
    {
        data,
        onClick,
        setshowIframe,
        savedLinks = []
    }) {
    let grayColor = "#808080";
    let yellowColor = "#E8DD11FF";
    const [rowInfo, setRowInfo] = useState(data)
    const [userLinks, setUserLinks] = useState(savedLinks)
    let path = data.PaginaURL.split("/");
    let index = path.length;

    const onClickSave = () => {
        onClick(rowInfo)
    }
    const openNewTap = () => {
        window.open(data.PaginaURL, "_blank");
    }
    const onClickLayout = (event) => {
        event.preventDefault()
        if (event.target.className === "sidebar-card-view-title"
            || event.target.className === "sidebar-card-view-url") {
            setshowIframe(data.PaginaURL)
        }
        return false
    }

    return (
        <div>
            <div className={"sidebar-card-view-main-layout"} onClick={onClickLayout}>
                <div className={"sidebar-card-view-title"}>
                    {
                        path[index - 1]
                    }
                </div>
                <div className={"sidebar-card-view-layout-bottom"}>
                    <div className={"sidebar-card-view-url"}>
                        {data.PaginaURL}
                    </div>
                    <Stack direction="row" alignItems="center">
                        <IconButton aria-label="startIcon"
                                    sx={{color: userLinks.includes(data.id) ? yellowColor : grayColor}}
                                    onClick={onClickSave}>
                            <StarIcon fontSize="small"/>
                        </IconButton>
                        <IconButton
                            aria-label="Open new tap"
                            sx={{color: grayColor}}
                            onClick={openNewTap}>
                            <OpenInNewIcon fontSize="small"/>
                        </IconButton>
                    </Stack>
                </div>
            </div>
        </div>
    );
}