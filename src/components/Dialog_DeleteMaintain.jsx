import { useState, Fragment } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import axios from "axios";

export default function DeleteItemDialog({ itemContent, openDialog, handleClose }) {
    const handleSend = () => {
        console.log(itemContent);
        axios.delete(process.env.REACT_APP_API_URL + `/api/maintain/${itemContent.sn}`)
                .then(({data, }) => {
                    console.log(data);
                    handleClose(false);
                }).catch((err) => console.error(err));
    };

    return (
        <Fragment>
            <Dialog open={openDialog} onClose={handleClose}
                aria-labelledby="delete-alert-dialog-title" aria-describedby="delete-alert-dialog-description">
                    <DialogTitle id="delete-alert-dialog-title" >
                        {`確認刪除?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-alert-dialog-content" >
                            {`將會刪除指定保養項目且無法恢復
                                但已有保養紀錄將不受任何影響`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSend}>
                            Still Delete
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}