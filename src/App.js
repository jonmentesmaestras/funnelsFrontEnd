import SearchToolbar from "./components/SearchToolbar";
import ToolbarComponent from "./components/ToolbarComponent";
import "./App.css"
import MainLayout from "./views/MainLayout";
import { useState } from "react";
import ListDialogComponent from "./components/Dialogs/ListDialogComponent";
import logoSpy from "./assets/img_logo_funnels.png";
import DialogSaveLink from "./components/Dialogs/DialogSaveLink";
import SideBar from "./views/innerViews/SideBar";
import LoaderComponent from "./components/loaders/LoaderComponent";
import { BrowserRouter } from "react-router-dom";

function App() {
    let [domainsResult, setDomainsResult] = useState([]);
    let [openSidebar, setOpenSidebar] = useState(false);
    let [showLayoutResult, setShowLayoutResult] = useState(false);
    let [openDialog, setOpenDialog] = useState(true);
    let [openSaveDialog, setSaveDialog] = useState(false);
    let [linkSelected, setLinkSelected] = useState({});
    let [userCategories, setUserCategories] = useState([]);
    let [reloadCategories, setReloadCategories] = useState(false);
    let [showIframe, setshowIframe] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [savedLinks, setSavedLinks] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const domain = queryParameters.get('domain') ?? ""
    const content = [
        "Para investigar embudos, escriba el nombre de dominio (por ejemplo, activecampaign.com). No utilice el prefijo https://. Escriba sólo el dominio",
        "Haga clic en la lupa para iniciar la búsqueda.",
        "Los resultados se mostrarán como una lista en el lado izquierdo de la pantalla.",
        "Si tiene algún problema, envíenos un correo electrónico a soporte@clicspy.com."
    ]
    const setResults = (value) => {
        setDomainsResult(value)
        if (value.length > 0) {
            setShowLayoutResult(true)
        } else {
            setShowLayoutResult(false)
        }
    }
    const changeStatSidebar = () => {
        setOpenSidebar(!openSidebar)
        setSaveDialog(false)
    }
    const closeSidebar = () => {
        setShowLayoutResult(true)
        setOpenSidebar(false)
    }
    const saveLink = (linkToSave) => {
        setLinkSelected(linkToSave)
        setSaveDialog(!openSaveDialog)
    }
    const addLinkToSave = (idLink) => {
        savedLinks.push(idLink)
    }
    return (
        <div className={"parent-layout"}>
            <BrowserRouter>
                <div className={"main-layout"}>
                    <ToolbarComponent openSidebar={openSidebar} setOpenSidebar={changeStatSidebar} />
                    <SearchToolbar setResults={setResults}
                        closeSidebar={closeSidebar}
                        setIsLoading={setIsLoading}
                        searchDomain={domain} />
                    <div className="content-main-layout">
                        <SideBar
                            changeStatSidebar={changeStatSidebar}
                            openSidebar={openSidebar}
                            reloadCategories={reloadCategories}
                            userCategories={userCategories}
                            setReloadCategories={setReloadCategories}
                            setUserCategories={setUserCategories}
                            setIsLoading={setIsLoading}
                            setshowIframe={setshowIframe} />
                        <MainLayout domainResult={domainsResult}
                            saveLink={saveLink}
                            setshowIframe={setshowIframe}
                            showIframe={showIframe}
                            savedLinks={savedLinks}
                            openSidebar={openSidebar}
                            showLayoutResult={showLayoutResult}
                            setShowLayoutResult={setShowLayoutResult}
                        />
                    </div>

                </div>
                {openDialog === true && (
                    <ListDialogComponent setOpenDialog={setOpenDialog} image={logoSpy} content={content} />
                )}
                {openSaveDialog === true && (
                    <DialogSaveLink
                        setSaveDialog={setSaveDialog}
                        linkToSave={linkSelected}
                        userCategories={userCategories}
                        setUserCategories={setUserCategories}
                        setReloadCategories={setReloadCategories}
                        setStateSidebar={changeStatSidebar}
                        addLinkToSave={addLinkToSave} />
                )}
                {isLoading && (
                    <LoaderComponent />
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
