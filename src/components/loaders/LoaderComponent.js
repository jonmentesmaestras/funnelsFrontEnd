import {Box, CircularProgress} from '@mui/material'

export default function LoaderComponent() {
    return (
        <div className={"loader-container"}>
            <CircularProgress/>
        </div>
    )
}