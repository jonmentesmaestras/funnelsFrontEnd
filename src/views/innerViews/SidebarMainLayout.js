import GridLayoutLeft from "./GridLayoutLeft";
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close'
import {TEXT_CATEGORY_BTN} from "../../utils/Constants";
import {IconButton, InputAdornment, TextField} from '@mui/material'
import * as FunnelsSvc from "../../services/FunnelsSvc";

export default function SidebarMainLayout(
    {
        reloadCategories,
        setReloadCategories,
        userCategories,
        setUserCategories,
        setIsLoading,
        setshowIframe
    }) {
    let [newCategory, setNewCategory] = useState("");
    let [textButtonCategory, setTextButtonCategory] = useState(TEXT_CATEGORY_BTN.CREATE);
    let [dataRows, setDataRows] = useState(userCategories);
    let [addMode, setAddMode] = useState(false)
    let [iconCreataCategoryBtn, setIconCreataCategoryBtn] = useState(<AddIcon/>)

    const queryParameters = new URLSearchParams(window.location.search)
    let userToken = queryParameters.get('token') ?? null

    useEffect(() => {
        loadData();
    }, []);

    /**
     * Obtener los datos del servidor.
     * @returns {Promise<void>}
     */
    let loadData = async () => {
        setIsLoading(true)
        let result = await FunnelsSvc.loadUserCategories(userToken)
        if (result.http_code === 200) {
            let rowsInfo = await result.data;
            if (rowsInfo !== null) {
                setDataRows(rowsInfo.SRC)
                setUserCategories(rowsInfo.SRC)
            }
        }
        setReloadCategories(false)
        setIsLoading(false)
    }

    if (reloadCategories) {
        loadData()
    }

    /*  INIT EVENTS */

    const onChangeNewCategoryInput = async (event) => {
        setNewCategory(event.target.value)
    }

    /**
     * Evento para el botón crear categoría
     * @returns {Promise<void>}
     */
    const onClickCreateCategoryBtn = async () => {
        setMode()
    }

    const onKeyEnter = async (envent) => {
        if (addMode && envent.key === "Enter") {
            // await trySubmit(envent.target.value)
        }
    }

    const onClickAddIcon = async () => {
        if (newCategory === "") {
            return
        }
        await trySubmit(newCategory)
    }

    /*  END EVENTS */


    /*  INIT FUNCTIONS  */
    const setMode = async () => {
        // Cambiar el estado del formulario
        setAddMode(!addMode)
        // Cambiar el texto del botón
        setTextButtonCategory(addMode ? TEXT_CATEGORY_BTN.CREATE : TEXT_CATEGORY_BTN.CANCEL)
        // Cambiar el icono del botón de crear categoría
        setIconCreataCategoryBtn(addMode ? <AddIcon/> : <CloseIcon/>)
    }
    const trySubmit = async (categoryName) => {
        setIsLoading(true)
        setMode()
        let resultCreate = await FunnelsSvc.createCategory(categoryName, userToken);
        setIsLoading(false)
        if (resultCreate.error === true) {
            alert(resultCreate.message)
        } else {
            await loadData()
        }
    }

    /*  END FUNCTIONS   */
    return (
        <div className={"sidebar-main-layout"}>
            <div className={"sidebar-label-title"}>Páginas guardadas</div>
            <div className={"sidebar-container-button-create-category"}>
                <Button
                    fullWidth
                    style={{
                        borderColor: "black",
                        color: "black",
                        fontSize: "12px",
                        textTransform: "none"
                    }} variant="outlined"
                    endIcon={iconCreataCategoryBtn}
                    onClick={onClickCreateCategoryBtn}>{textButtonCategory}</Button>
            </div>
            {addMode &&
                (<div className={"sidebar-container-input-create-category"}>
                    <TextField
                        required
                        fullWidth
                        size="small"
                        name="createCategory"
                        variant="outlined"
                        placeholder="Crear nueva categoría"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" type="submit" size="small"
                                                onClick={onClickAddIcon}>
                                        <SaveIcon fontSize="12"/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {fontSize: '12px'},
                        }}
                        onChange={onChangeNewCategoryInput}
                        onKeyDown={onKeyEnter}
                    />
                </div>)
            }
            <div className={"sidebar-container-accordion"}>
                <GridLayoutLeft
                    setReloadCategories={setReloadCategories}
                    rowsInfo={dataRows}
                    setIsLoading={setIsLoading}
                    setshowIframe={setshowIframe}/>
            </div>
        </div>
    );
}

