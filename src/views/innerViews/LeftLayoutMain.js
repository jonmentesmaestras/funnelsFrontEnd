import LeftLayoutResults from "./LeftLayoutResults";

export default function LeftLayoutMain(
    {
        resultSearch, saveLink, setLinkSelected, setshowIframe,savedLinks
    }) {

    return (
        <div>
            <LeftLayoutResults
                resultSearch={resultSearch}
                saveLink={saveLink}
                setLinkSelected={setLinkSelected}
                setshowIframe={setshowIframe}
                savedLinks={savedLinks}/>
        </div>
    )

}