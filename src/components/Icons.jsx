import React from "react";
import { Button } from "@mui/material";

function StyledButton(content) {
    return (
        <Button disableRipple={true} size="small" variant="contained" 
            sx={{ bgcolor: content.color, '&:hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    )
}


export function MaintainIcon(props) {
    let content = {
        color: 'grey.500',
        op: '未啟用',
    };

    if(props.status) {
        content.color = 'green';
        content.op = '預約';
    }

    return <StyledButton {...content} />;
}

export function StatusIcon(props) {
    let content = {
        color: 'red',
        op: '警報',
    };

    if(props.status === 'idle') {
        content.color = 'orange';
        content.op = '閒置中';
    } else if(props.status === 'running') {
        content.color = 'green';
        content.op = '運轉中';
    }

    return <StyledButton {...content} />;
}