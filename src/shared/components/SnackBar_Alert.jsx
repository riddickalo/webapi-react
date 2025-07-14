import { Fragment } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { Close, CheckCircle, Cancel } from "@mui/icons-material";

export default function AlertSnackbar({ openSnackbar, setOpenSnackbar, msg, type = 'info', position = { v: 'bottom', h: 'center' } }) {
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    // 根據類型決定樣式和圖標
    const getSnackbarStyle = () => {
        switch(type) {
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
    const message = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {style.icon}
            {msg}
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
            open={openSnackbar} 
            autoHideDuration={5000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: position.v, horizontal: position.h }}
            message={message}
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