import React from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import logo from './../assets/logo_funnels.png'
import funnelOnIcon from '../assets/icon_funnel.png'
import dashbordOnIcon from '../../src/dashboard.png'
import ghostIcon from '../../src/ghost.png'
import cademyIcon from '../../src/cademy.png'
import Dropdown from "./Dropdown/Dropdown";

export default function ToolbarComponent({ openSidebar, setOpenSidebar }) {
    let pathname = window.location.pathname;
    const classNameLogo = openSidebar ? "toolbar-logo open-sidebar" : "toolbar-logo"
    const onClick = () => {
        if (setOpenSidebar) {
            setOpenSidebar()
        }
    }

    const handleClick = (boton) => {
        switch (boton) {
            case 'anuncios':
                // window.open('https://clicspy.com/dashboard/?token=' + token, '_blank');
                window.open("/dashboard", '_blank');
                break;
            case 'funnels':
                // window.open('https://clicspy.com/afunnels/?token=' + token, '_blank');
                window.open("funnels", '_blank');
                break;
            case 'ghost':
                // window.open('https://clicspy.com/aghost/?token=' + token, '_blank');
                window.open("ghost", '_blank');
                break;
            case 'cademy':
                // window.open('https://clicspy.com/cademy/?token=' + token, '_blank');
                window.open("cademy", '_blank');
                break;
            default:
                return
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

            <ul className="toolbar">
                <li>
                    <button onClick={() => handleClick('anuncios')} className={`button ${pathname === "/dashboard" && "toolbar-buttons-links-active"}`}
                        title="Ir al Dashboard para ver Mis Anuncios Guardados">
                        <img className="toolbar-icons-buttons" src={dashbordOnIcon} alt="Dashboard" />
                        <span>Anuncios</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => handleClick('funnels')} className={`button ${pathname === "/funnels" && "toolbar-buttons-links-active"}`} title="Funnels">
                        <img className="toolbar-icons-buttons" src={funnelOnIcon} alt="Funnels" />
                        <span>Embudos</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => handleClick('ghost')} className={`button ${pathname === "/ghost" && "toolbar-buttons-links-active"}`} title="Ir a Ghost para ocultarme">
                        <img className="toolbar-icons-buttons" src={ghostIcon} alt="Ghost" />
                        <span>Ghost</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => handleClick('cademy')} className={`button ${pathname === "/dashboard" && "toolbar-buttons-links-active"}`}
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