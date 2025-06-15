import { Fragment } from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function CheckNotifyDialog({ testResp, openDialog, setOpenDialog }) {
    const dialogTitle = (resp) => {
        if(resp) {
            return "已傳送";
        } else {
            return "錯誤";
        }
    };

    const dialogContent = (resp) => {
        if(resp) {
            return "請確認Line群組訊息";
        } else {
            return "請確認是否設定正確Token，或邀請Line Notify至正確群組！";
        }
    };

    const handleClose = () => setOpenDialog(false);

    return (
        <Fragment>
            <Dialog open={openDialog} onClose={handleClose}
                aria-labelledby="test-notify-dialog-title">
                    <DialogTitle id="test-notify-dialog-title" aria-describedby="test-notify-dialog-description">
                        {dialogTitle(testResp.current)}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="test-notify-dialog-content" >
                            {dialogContent(testResp.current)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Confirm
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}