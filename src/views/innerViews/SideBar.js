import React from "react";
import SidebarMainLayout from "./SidebarMainLayout";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function SideBar(
    {
        changeStatSidebar,
        openSidebar,
        reloadCategories,
        setReloadCategories,
        userCategories,
        setUserCategories,
        setIsLoading,
        setshowIframe
    }) {
    // Asignar la clase al icono, para poder rotarlo cuando se cierra o abre el sidebar
    let iconClassName = openSidebar ? "toggle" : "toggle close";
    let iconBtn = <KeyboardArrowRightIcon className={iconClassName} sx={{color: "white"}}/>;
    const sidebarClass = openSidebar ? "sidebar" : "sidebar close";
    return (
        <div className={sidebarClass}>
            <SidebarMainLayout
                reloadCategories={reloadCategories}
                userCategories={userCategories}
                setReloadCategories={setReloadCategories}
                setUserCategories={setUserCategories}
                setIsLoading={setIsLoading}
                setshowIframe={setshowIframe}/>
        </div>
    );
}
