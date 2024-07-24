// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from "@mui/material/IconButton";

export default function ExpandButtonComponent(
    {
        contentOpen,
        onClickEvent
    }
) {

    let iconClassName = contentOpen ? "accordion-expand-content" : "accordion-expand-content close";
    let iconBtn = <NavigateNextIcon className={iconClassName}/>
    return (
        <button className={iconClassName} onClick={onClickEvent}>
            <IconButton>{iconBtn}</IconButton>
        </button>
    );
}