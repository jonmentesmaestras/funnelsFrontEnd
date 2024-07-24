import AccordionFunnelComponent from "../../components/AccordionFunnelComponent";
import React from "react";

export default function GridLayoutLeft(
    {rowsInfo, setReloadCategories, setIsLoading, setshowIframe}) {
    let {categorias, links} = rowsInfo;
    let rowNumber = 0;
    return (
        <>
            {
                categorias && (
                    categorias.map(function (itemCategory) {
                        let firstRow = true;
                        rowNumber++;
                        if (rowNumber > 1) {
                            firstRow = false;
                        }
                        if (links && links[itemCategory.id]) {
                            return (
                                <AccordionFunnelComponent
                                    setReloadCategories={setReloadCategories}
                                    categoryObject={itemCategory}
                                    rowsInfo={links[itemCategory.id]}
                                    openRow={firstRow}
                                    setIsLoading={setIsLoading}
                                    setshowIframe={setshowIframe}/>
                            )
                        } else {
                            return (
                                <AccordionFunnelComponent
                                    setReloadCategories={setReloadCategories}
                                    categoryObject={itemCategory}
                                    openRow={firstRow}
                                    setIsLoading={setIsLoading}/>
                            )
                        }
                    })
                )
            }
        </>
    );
}
