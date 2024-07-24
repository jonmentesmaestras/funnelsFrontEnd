import CardViewResultSearch from "../../components/CardViewResultSearch";

export default function LeftLayoutResults({resultSearch, saveLink, setLinkSelected, setshowIframe, savedLinks}) {
    const showResults = resultSearch.length > 0;
    const onItemClickHandler = (rowInfo) => {
        saveLink(rowInfo)
    }
    if (showResults) {
        return (
            <div className={"left-layout-results"}>
                <div className={"left-layout-label-title"}>Páginas encontradas</div>
                <div className={"left-layout-container-results"}>
                    {resultSearch.map(function (data) {
                        return (
                            <CardViewResultSearch
                                data={data}
                                setLinkSelected={setLinkSelected}
                                onClick={onItemClickHandler}
                                setshowIframe={setshowIframe}
                                savedLinks={savedLinks}/>
                        )
                    })}
                </div>
            </div>
        );
    }else{
       // alert("No hay resultados para mostrar")
    }
}