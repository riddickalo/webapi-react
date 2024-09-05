import React from "react";
import { Button } from "@mui/material";
import { Edit, SaveAs } from "@mui/icons-material";

function StyledButton(content) {
    return (
        <Button disableRipple={true} size="small" variant="contained" 
            sx={{ bgcolor: content.color, '&:hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    )
}

export function EditNcInfoButton(props) {
    return (
        <Button size="small" variant="contained" startIcon={<Edit />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#00AEAE', '&:hover': {bgcolor: '#007979'} }}>
            編輯
        </Button>
    )
}

export function SaveNcInfoButton(props) {
    return (
        <Button size="small" variant="contained" startIcon={<SaveAs />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#02C874', '&:hover': {bgcolor: '#02F78E'} }}>
            儲存
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