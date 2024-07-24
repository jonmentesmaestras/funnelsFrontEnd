import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function CardView({rowsInfo, onClick}) {
    let yellowColor = "#E8DD11FF";
    let grayColor = "#808080";
    return (
        <>
            {rowsInfo.map(function (data) {
                let iconColor = data.id ? yellowColor : grayColor;
                return (
                    <div className={"sidebar-card-view-main-layout"}>
                        <div className={"sidebar-card-view-title"}>
                            {data.linkName}
                        </div>
                        <div className={"sidebar-card-view-layout-bottom"}>
                            <div className={"sidebar-card-view-url"}
                                 onClick={() => onClick(data)}>
                                {data.src}
                            </div>
                            <Stack direction="row" alignItems="center">
                                <IconButton
                                    sx={{color: iconColor}}>
                                    <StarIcon fontSize="small"/>
                                </IconButton>
                                <IconButton sx={{color: grayColor}}
                                            onClick={() => window.open(data.src, "_blank")}>
                                    <OpenInNewIcon fontSize="small"/>
                                </IconButton>
                            </Stack>
                        </div>
                    </div>
                );
            })}
        </>
    );
}