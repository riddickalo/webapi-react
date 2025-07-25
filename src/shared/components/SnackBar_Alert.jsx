import { Fragment } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Close, CheckCircle, Cancel } from "@mui/icons-material";

export default function AlertSnackbar({ open, onClose, message, severity = 'info', position = { vertical: 'bottom', horizontal: 'center' } }) {
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        if (onClose) {
            onClose();
        }
    }

    // 根據類型決定樣式和圖標
    const getSnackbarStyle = () => {
        switch(severity) {
            case 'success':
                return {
                    backgroundColor: '#4caf50',
                    color: 'white',
                    icon: <CheckCircle sx={{ color: 'white', mr: 1 }} />
                };
            case 'fail':
            case 'error':
                return {
                    backgroundColor: '#f44336',
                    color: 'white',
                    icon: <Cancel sx={{ color: 'white', mr: 1 }} />
                };
            case 'info':
            default:
                return {
                    backgroundColor: 'white',
                    color: 'black',
                    icon: null
                };
        }
    };

    // 根據類型決定消息內容和動作
    const style = getSnackbarStyle();
    const messageContent = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {style.icon}
            {message}
        </div>
    );

    const action = (
        <Fragment>
            <IconButton size="small" aria-label="close" sx={{ color: '#555555' }} onClick={handleClose}>
                <Close fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
            message={messageContent}
            action={action}
            ContentProps={{
                sx: {
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                    fontWeight: 'medium'
                }
            }}
            sx={{ width: '100%' }} 
        />
    );
}