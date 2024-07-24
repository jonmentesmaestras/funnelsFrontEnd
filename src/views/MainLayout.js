import CenterLayout from "./innerViews/CenterLayout";
import RightLayout from "./innerViews/RightLayout";
import LeftLayoutMain from "./innerViews/LeftLayoutMain";
import CircularToggleComponent from "../components/CircularToggleComponent";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {useEffect, useState} from "react";

export default function MainLayout({
                                       domainResult,
                                       saveLink,
                                       setshowIframe,
                                       showIframe,
                                       savedLinks,
                                       openSidebar,
                                       showLayoutResult,
                                       setShowLayoutResult
                                   }) {
    let [isCloseLayout, setIsCloseLayout] = useState(!showLayoutResult)
    // let classNameLeftLayoutMain = isCloseLayout && !showLayoutResult ? "left-layout-main close" : "left-layout-main";
    let classNameLeftLayoutMain = showLayoutResult ? "left-layout-main" : "left-layout-main close";
    if (openSidebar) {
        classNameLeftLayoutMain = "left-layout-main close";
    }
    const onClickToggle = () => {
        if (domainResult.length === 0) {
            setShowLayoutResult(false)
            setIsCloseLayout(false)
            return
        }
        setIsCloseLayout(!isCloseLayout)
        setShowLayoutResult(!showLayoutResult)
    }
    return (
        <div className="content">
            {showLayoutResult && (
                <div className={classNameLeftLayoutMain}>
                    <LeftLayoutMain
                        resultSearch={domainResult}
                        saveLink={saveLink}
                        setshowIframe={setshowIframe}
                        savedLinks={savedLinks}/>
                </div>
            )}
            {!openSidebar && domainResult.length > 0 && (
                <CircularToggleComponent
                    icon={<KeyboardArrowLeftIcon
                        sx={{color: "white"}}
                        onClick={onClickToggle}/>}
                    isCloseLayout={!showLayoutResult}/>
            )}
            <CenterLayout showIframe={showIframe}/>
            {/*<RightLayout/>*/}
        </div>
    )

}