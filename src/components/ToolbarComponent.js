import React from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import logo from './../assets/logo_funnels.png'
import icon_funnel from './../assets/icon_funnel.png'
import IconProfile from './../assets/icon_profile.png'
import dashbordOnIcon from '../../src/dashboard.png'
import ghostIcon from '../../src/ghost.png'
import cademyIcon from '../../src/cademy.png'

export default function ToolbarComponent({openSidebar, setOpenSidebar}) {
    const classNameLogo = openSidebar ? "toolbar-logo open-sidebar" : "toolbar-logo"
    const onClick = () => {
        if (setOpenSidebar) {
            setOpenSidebar()
        }
    }
    return (
        <div className={"toolbar"}>
            {!openSidebar && (
                <DehazeIcon className={"toolbar-icon-menu"}
                            sx={{color: "white"}}
                            onClick={onClick}/>
            )}
            <img className={classNameLogo} src={logo} alt={"Logo clic spy funnels"}/>
            {
                openSidebar && (
                    <KeyboardArrowLeftIcon className={"toolbar-icon-menu"}
                                           sx={{color: "white"}}
                                           onClick={onClick}/>
                )
            }
            <div className={"toolbar-container-buttons-links"}>
                <button className={"toolbar-buttons-links"}
                        title={"Ir al Dashboard"}
                        onClick={() => {
                            window.open(`https://clicspy.com/dashboard`, "_blank")
                        }}>
                    <img className={"toolbar-icons-buttons"}
                         src={dashbordOnIcon} alt={"Logo clic spy"}/>
                </button>
                <button className={"toolbar-buttons-links-active"}
                        title={"Estas en Funnels"}>
                    <img className={"toolbar-icons-buttons"}
                         src={icon_funnel} alt={"Estas en Funnels"}/>
                </button>
                <button className={"toolbar-buttons-links"}
                        title={"Ir a ClicSpy Ghost"}
                        onClick={() => {
                            window.open(`https://clicspy.com/ghost`, "_blank")
                        }}>
                    <img className={"toolbar-icons-buttons"}
                         src={ghostIcon}
                         alt={"Ir a ClicSpy Ghost"}/>
                </button>
                <button className={"toolbar-buttons-links"}
                        title={"Ir a ClicSpy Cademy"}
                        onClick={() => {
                            window.open(`https://clicspy.com/cademy`, "_blank")
                        }}>
                    <img className={"toolbar-icons-buttons"}
                         src={cademyIcon}
                         alt={"Ir a ClicSpy Ghost"}/>
                </button>

            </div>
            <div className={"toolbar-container-buttons-links-profile"}>
                <button className={"toolbar-buttons-links"}>
                    <img className={"toolbar-icons-buttons"} src={IconProfile} alt={"Logo clic spy"}/>
                </button>
            </div>
        </div>
    );
}