import React from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import logo from './../assets/logo_funnels.png'
import dashbordOnIcon from '../../src/dashboard.png'
import ghostIcon from '../../src/ghost.png'
import cademyIcon from '../../src/cademy.png'
import Dropdown from "./Dropdown/Dropdown";

export default function ToolbarComponent({ openSidebar, setOpenSidebar }) {
    const classNameLogo = openSidebar ? "toolbar-logo open-sidebar" : "toolbar-logo"
    const onClick = () => {
        if (setOpenSidebar) {
            setOpenSidebar()
        }
    }

    return (
        <div className={"toolbar"}>
            <div className="logoContainer">
                {!openSidebar && (
                    <DehazeIcon className={"toolbar-icon-menu"}
                        sx={{ color: "white" }}
                        onClick={onClick} />
                )}
                <img className={classNameLogo} src={logo} alt={"Logo clic spy funnels"} />
                {
                    openSidebar && (
                        <KeyboardArrowLeftIcon className={"toolbar-icon-menu"}
                            sx={{ color: "white" }}
                            onClick={onClick} />
                    )
                }
            </div>
            <ul>
                <li>
                    <button onClick={() => {
                        window.open(`https://clicspy.com/dashboard`, "_blank")
                    }} className="button"
                        title="Ir al Dashboard para ver Mis Anuncios Guardados">
                        <img className="toolbar-icons-buttons" src={dashbordOnIcon} alt="Dashboard" />
                        <span>Anuncios</span>
                    </button>
                </li>
                <li>
                    <button className="button toolbar-buttons-links-active" title="Funnels">
                        <img className="toolbar-icons-buttons" src={ghostIcon} alt="Funnels" />
                        <span>Embudos</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => {
                        window.open(`https://clicspy.com/cademy`, "_blank")
                    }} className="button"
                        title="Ir a Cademy para Entrenarme">
                        <img className="toolbar-icons-buttons" src={cademyIcon} alt="Cademy" />
                        <span>Academia</span>
                    </button>
                </li>
                <li>
                    <a href="#cademy">
                        <Dropdown />
                    </a>
                </li>
            </ul>
        </div>
    );
}