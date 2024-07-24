import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close'
import {IconButton} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SaveIcon from '@mui/icons-material/Save';
import CardviewOptionsComponent from "../Cardviews/CardviewOptionsComponent";
import InputCategoryComponent from "../Inputs/InputCategoryComponent";
import * as FunnelsSvc from "../../services/FunnelsSvc";
import InputComponentTwoIcons from "../Inputs/InputComponentTwoIcons";

export default function DialogSaveLink(
    {
        setSaveDialog,
        linkToSave,
        userCategories,
        setUserCategories,
        setReloadCategories,
        addLinkToSave
    }) {
    const [addNewCategory, setAddNewCategory] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showInputSelectCategory, setShowInputSelectCategory] = useState(true);
    const [rowsInfo, setRowInfo] = useState(userCategories);
    const [linkSelected, setLinkSelected] = useState(linkToSave);
    const [placeholderSelectCategory, setPlaceholderSelectCategory] = useState("Seleccionar categoría");
    const [linkName, setLinkName] = useState("");
    const [nameNewCategory, setNameNewCategory] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const handleFocus = (event) =>{
        
        setShowCategories(true)
    }

    const handleClose = (event) => {
        if (setSaveDialog) {
            setSaveDialog(false)
        }
    };

    /**
     * listar las categorías
     */
    const onclickShowCategories = () => {
        setAddNewCategory(false)
        setShowCategories(!showCategories)
    };
    const onClickAddCategory = () => {
        setShowInputSelectCategory(false)
        setPlaceholderSelectCategory("")
        setSelectedCategoryId("")
        setShowCategories(false)
        setAddNewCategory(true)
    }
    const onClickCancelAddCategory = () => {
        if (selectedCategoryId === "") {
            setPlaceholderSelectCategory("Seleccionar categoría")
        }
        setShowInputSelectCategory(true)
        setAddNewCategory(false)
        setShowCategories(false)
    }

    const onClickSelectCategory = (rowSelected) => {
        setPlaceholderSelectCategory(rowSelected.name)
        setSelectedCategoryId(rowSelected.id)
        setShowInputSelectCategory(true)
        setAddNewCategory(false)
        setShowCategories(false)
    }

    const onClickSaveCategory = async () => {
        if (nameNewCategory === "") {
            return
        }
        let resultSaveCategory = await FunnelsSvc.createCategory(nameNewCategory)
        if (resultSaveCategory.http_code === 200) {
            let rowsInfo = await resultSaveCategory.data;
            if (rowsInfo !== null) {
                setSelectedCategoryId(rowsInfo.id)
                setPlaceholderSelectCategory(rowsInfo.name)
            }
            setShowInputSelectCategory(true)
            setAddNewCategory(false)
        }
        if (resultSaveCategory.http_code === 400) {
            alert(resultSaveCategory.message)
        } else if (setUserCategories) {
            let resultSaveCategory = await FunnelsSvc.loadUserCategories()
            if (resultSaveCategory.http_code === 200) {
                let rowsInfo = await resultSaveCategory.data;
                if (rowsInfo !== null) {
                    setRowInfo(rowsInfo.SRC)
                    // setUserCategories(rowsInfo.SRC)
                }
            }
        }
        setReloadCategories(true)
    }

    const onClickSaveLink = async () => {
        if (linkName === "") {
            return
        }
        setShowInputSelectCategory(true)
        let newLink = {
            category_id: selectedCategoryId,
            src: linkSelected.PaginaURL,
            link_name: linkName
        }
        let resultSaveLink = await FunnelsSvc.saveLink(newLink)
        if (resultSaveLink.http_code === 200) {
            setAddNewCategory(false)
            addLinkToSave(linkToSave.id)
        }
        setReloadCategories(true)
        setSaveDialog(false)
    }

    /*  INIT FUNCTIONS  */


    /*  END FUNCTIONS   */

    return (
        <div className={"dialog-main-layout"}>
            <div className={"dialog-save-content"}>
                <div className={"dialog-save-wrapper-title"}>
                    <label className={"dialog-save-label-title"}>Guardar enlace</label>
                    <IconButton
                        sx={{position: 'absolute', right: 0}}
                        size="small"
                        onClick={handleClose}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                </div>
                <div className={"dialog-save-category"}>
                    {showInputSelectCategory && (
                        <div className={"dialog-save-wrapper-style-input"}>
                            <div className={"dialog-save-wrapper-select-category"}>
                                <input className={"dialog-save-input"}
                                       placeholder={placeholderSelectCategory}
                                       readOnly={true}
                                       onFocus={handleFocus}
                                />
                                {rowsInfo.categorias !== undefined && (
                                    <IconButton aria-label="delete" clear
                                                size="small"
                                                onClick={onclickShowCategories}>
                                        <ArrowDropDownIcon/>
                                    </IconButton>
                                )}
                            </div>
                            <IconButton aria-label="delete" clear
                                        size="small"
                                        onClick={onClickAddCategory}>
                                <AddIcon fontSize="inherit"/>
                            </IconButton>
                        </div>
                    )}
                    {addNewCategory && (
                        <div className={"dialog-save-form-add-category"}>
                            <InputComponentTwoIcons
                                value={nameNewCategory}
                                onChange={(text) => setNameNewCategory(text)}
                                placeholder={"Escribe el nombre de la categoría"}
                                rightIcon={<SaveIcon fontSize="inherit"/>}
                                onClickRightIcon={onClickSaveCategory}
                                secondRightIcon={<CloseIcon fontSize="inherit"/>}
                                onClickSecondRightIcon={onClickCancelAddCategory}/>
                            {/*<button*/}
                            {/*    className={"dialog-save-button-submit-category"}*/}
                            {/*    onClick={onClickSaveCategory}>Guardar*/}
                            {/*</button>*/}
                        </div>
                    )}
                    {
                        showCategories && (
                            <div className={"dialog-save-wrapper-categories"}>
                                <div className={"dialog-save-cardview-content-category-list"}>
                                    {rowsInfo.categorias.map(function (row) {
                                        return (
                                            <CardviewOptionsComponent
                                                rowsInfo={row}
                                                onClickSelectCategory={onClickSelectCategory}/>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                    {
                        selectedCategoryId && (
                            <div className={"dialog-save-form-add-category"}>
                                <InputCategoryComponent
                                    value={nameNewCategory}
                                    onChange={(text) => setLinkName(text)}
                                    placeholder={"Escribe el nombre del link"}
                                    onClickRightIcon={onClickCancelAddCategory}/>
                                <button
                                    className={"dialog-save-button-submit-category"}
                                    onClick={onClickSaveLink}>Guardar
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}