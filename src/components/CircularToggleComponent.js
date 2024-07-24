import IconButton from '@mui/material/IconButton';

export default function CircularToggleComponent(
    {
        icon,
        onClick,
        isCloseLayout
    }
) {
    let className = isCloseLayout ? "sidebar-toggle close": "sidebar-toggle"
    const onClickToggle = () => {
        if (onClick) {
            onClick()
        }
    }
    return (
        <button className={className} onClick={onClickToggle}>
            <IconButton>{icon}</IconButton>
        </button>
    );
}