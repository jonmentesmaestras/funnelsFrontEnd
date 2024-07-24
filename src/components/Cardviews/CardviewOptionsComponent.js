import * as React from "react";
import {useState} from "react";

export default function CardviewOptionsComponent(
    {
        rowsInfo,
        onClickSelectCategory
    }) {
    const [data, setData] = useState(rowsInfo);

    return (
        <div className={"dialog-save-cardview-category"} onClick={() => onClickSelectCategory(data)}>
            <p>{data.name}</p>
        </div>
    )
}