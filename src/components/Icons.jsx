import React from "react";
import { Button } from "@mui/material";
import { grey, green, blue } from "@mui/material/colors";
import { Edit, SaveAs, AlarmOn, PlaylistAdd, PlaylistRemove, DoneAll, DeleteForever, Redo } from "@mui/icons-material";

function StyledIcon(content) {
    return (
        <Button name={content.name} size="small" variant="contained" 
            startIcon={content.icon} onClick={content.onClick} disableRipple={true}
            sx={{ color: content.fontColor, bgcolor: content.color, '&:hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    )
}
// 機台參數編輯按鍵
export function EditNcInfoButton(props) {
    return (
        <Button size="small" variant="contained" startIcon={<Edit />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#00AEAE', '&:hover': {bgcolor: '#007979'} }}>
            編輯
        </Button>
    )
}
// 機台參數儲存按鍵
export function SaveNcInfoButton(props) {
    return (
        <Button size="small" variant="contained" startIcon={<SaveAs />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#02C874', '&:hover': {bgcolor: '#02F78E'} }}>
            儲存
        </Button>
    )
}
// 機台運行狀態顯示圖案
export function StatusIcon(props) {
    let content = {
        color: 'red',
        op: '警報',
        icon: null,
        onClick: null,
        name: null,
        fontColor: 'white',
    };

    if(props.status === 'idle') {
        content.color = '#FFD306';
        content.op = '閒置中';
    } else if(props.status === 'running') {
        content.color = 'green';
        content.op = '運轉中';
    } else if(props.status === 'warning') {
        content.color = 'orange';
        content.op = '警告';
    } else if(props.status === 'pause') {
        content.color = '#AFAF61';
        content.op = '暫停中';
    } else if(props.status === 'offline') {
        content.color = '#808070';
        content.op = '未連線';
    }

    return <StyledIcon {...content} />;
}
// 機台保養狀態顯示圖案
export function MaintainIcon(props) {
    let content = {
        color: grey[500],
        op: '未啟用',
        icon: null,
        onClick: null,
        name: null,
        fontColor: 'white',
    };

    if(props.status === 1) {
        content.color = 'green';
        content.op = '預約';
    } else if(props.status === 2) {
        content.color = 'orange';
        content.op = '需保養';
        // content.fontColor = 'black';
    } else if(props.status === 3) {
        content.color = 'red';
        content.op = '過期';
    }

    return <StyledIcon {...content} />;
}
// 保養項目編輯按鍵
export function EditMaintainButton(props) {
    return (
        <Button size="small" variant="contained" startIcon={<Edit />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#00AEAE', '&:hover': {bgcolor: '#007979'} }}>
            編輯
        </Button>
    )
}
// 保養項目啟用狀態顯示圖案
export function MaintainEnabledIcon(props) {
    let content = {
        color: grey[500],
        op: '停用中',
        icon: <PlaylistRemove />,
    };
    
    if(props.status) {
        content.color = blue[500];
        content.op = '啟用中';
        content.icon = <PlaylistAdd />;
    }

    return (
        <Button name={props.name} size="small" variant="contained"
            startIcon={content.icon} onClick={props.onClick} disableRipple={true}
            sx={{ bgcolor: content.color, '&:hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    );
}
// 儲存保養項目編輯和刪除項目按鍵
export function SaveMaintainItemButton(props) {
    return(
        <Button size="small" variant="contained" startIcon={<DoneAll />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#46A3FF', '&:hover': {bgcolor: '#0080FF'} }}>
            完成
        </Button>
    );
}
export function DeleteMaintainItemButton(props) {
    return(
        <Button size="small" variant="contained" startIcon={<DeleteForever />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#FF5809', '&:hover': {bgcolor: '#FF8F59'} }}>
            刪除
        </Button>
    );
}

export function CheckMaintainItemButton(props) {
    return(
        <Button size="small" variant="contained" startIcon={<AlarmOn />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ color: 'black', bgcolor: '#F9F900', '&:hover': {bgcolor: '#C4C400'} }}>
            完工
        </Button>
    );
}

export function BackMaintainItemButton(props) {
    return(
        <Button size="small" variant="contained" startIcon={<Redo />}
            name={`${props.id}`} onClick={props.onClick}
            sx={{ bgcolor: '#9999CC', '&:hover': {bgcolor: '#B8B8DC'} }}>
            返回
        </Button>
    );
}