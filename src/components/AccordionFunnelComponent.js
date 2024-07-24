import * as React from "react";
import {useState} from "react";
import CardView from "./CardView";
import ExpandButtonComponent from "./ExpandButtonComponent";
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import * as FunnelsSvc from "../services/FunnelsSvc";

export default function AccordionFunnelComponent({
                                                     categoryObject,
                                                     rowsInfo,
                                                     openRow,
                                                     setReloadCategories,
                                                     setIsLoading,
                                                     setshowIframe
                                                 }) {
    let [isOpen, setIsOpen] = useState(openRow);
    let [editCategory, setEditCategory] = useState(false)
    let [newNameCategory, setNewNameCategory] = useState("")
    let [placeholder, setPlaceholder] = useState("")
    let [showOptions, setShowOptions] = useState(false)
    const queryParameters = new URLSearchParams(window.location.search)
    let userToken = queryParameters.get('token') ?? null

    /**
     * Configurar el nombre de la categoría cuando se está editando
     * @param event
     * @returns {Promise<void>}
     */
    const onChangeNewNameCategory = async (event) => {
        setNewNameCategory(event.target.value)
    }
    /**
     * Escuchar el clic en el botón expandir categoría
     */
    const onClickExpanBtn = () => {
        setIsOpen(!isOpen)
    }
    /**
     * Escuchar el clic en el botón guardar categoría
     */
    const onClickSaveNameCategory = () => {
        if (newNameCategory === "") {
            return
        }
        setEditCategory(!editCategory)
        trySubmit(categoryObject)
    }

    /**
     * Escuchar cuando se presiona la tecla enter.
     * @param envent
     * @returns {Promise<void>}
     */
    const onKeyEnter = async (envent) => {
        if (newNameCategory === "") {
            return
        }
        if (editCategory && envent.key === "Enter") {
            setEditCategory(!editCategory)
            await trySubmit(categoryObject)
        }
    }

    /**
     * Enviar la información al servidor
     * @param categoryObject
     * @returns {Promise<void>}
     */
    const trySubmit = async (categoryObject) => {
        setIsLoading(true)
        let payload = {category_id: categoryObject.id, name: newNameCategory}
        let resultCreate = await FunnelsSvc.updateCategories(payload);
        setIsLoading(false)
        if (resultCreate.error === true) {
            alert(resultCreate.message)
        } else {
            setReloadCategories(true)
        }
    }

    /**
     * Poner el script en modo edición
     */
    const setEditMode = () => {
        setEditCategory(!editCategory)
        setPlaceholder(categoryObject.name)
        setShowOptions(false)
    }

    /**
     * Borrar la categoría
     * @returns {Promise<void>}
     */
    const onclickDeleteCategory = async () => {
        setIsLoading(true)
        let resultDelete = await FunnelsSvc.deleteCategory(categoryObject.id, userToken);
        setIsLoading(false)
        if (resultDelete.error === true) {
            alert(resultDelete.message)
        } else {
            setReloadCategories(true)
        }
    }

    const onClickNameCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (event.detail) {
            case 2:
                setEditCategory(!editCategory)
                setPlaceholder(categoryObject.name)
                setShowOptions(false)
                break
            default:
                // alert("Estamos aqui")
                return;
        }
    }

    /**
     * Cancelas el proceso de edición
     */
    const cancelEdit = () => {
        setEditCategory(!editCategory)
        setNewNameCategory("")
    }

    /**
     * Escuchar cuando el mouse se posiciona en el nombre de la categoria
     */
    const handleMouseEnter = () => {
        if (!editCategory) {
            setShowOptions(true)
        }
    };

    /**
     * Escuchar cuando el mouse sale del nombre de la categoria
     */
    const handleMouseLeave = () => {
        setShowOptions(false)
    };

    const onClickCard = (data) => {
        setshowIframe(data.src)
    }

    return (
        <div className={"accordion-layout"}>
            <div className={"accordion-wrapper-category-name"}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}>
                <ExpandButtonComponent contentOpen={isOpen} onClickEvent={onClickExpanBtn}/>
                {
                    editCategory ? (
                        <div className={"sidebar-container-input-edit-category"}>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                name="createCategory"
                                variant="outlined"
                                placeholder={placeholder}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end" size="small"
                                                onClick={onClickSaveNameCategory}>
                                                <SaveIcon fontSize="12"/>
                                            </IconButton>
                                            <IconButton edge="end" type="submit" size="small"
                                                        onClick={cancelEdit}>
                                                <CloseIcon fontSize="12"/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: {fontSize: '12px'},
                                }}
                                onChange={onChangeNewNameCategory}
                                onKeyDown={onKeyEnter}
                            />
                        </div>
                    ) : (
                        <div className={"accordion-label-category-name"}>{categoryObject.name}</div>
                    )
                }
                {
                    showOptions && (
                        <div>
                            <IconButton sx={{"margin-left": "16px"}}
                                        size="small"
                                        onClick={onclickDeleteCategory}>
                                <DeleteIcon fontSize="12"/>
                            </IconButton>
                            <IconButton sx={{"margin-left": "8px"}}
                                        size="small"
                                        onClick={setEditMode}>
                                <EditIcon fontSize="12"/>
                            </IconButton>
                        </div>
                    )
                }
                {/*< InputCategoryComponent className={"accordion-label-category-name"}/>*/}
                {/*<div className={"accordion-label-category-name"}*/}
                {/*     onClick={() => setIsOpen(!isOpen)}>{categoryObject.name}</div>*/}
            </div>
            <div className={"accordion-card-view-container"}>
                {isOpen && rowsInfo && (
                    <CardView rowsInfo={rowsInfo} onClick={onClickCard}/>
                )}
            </div>
        </div>
    );
}