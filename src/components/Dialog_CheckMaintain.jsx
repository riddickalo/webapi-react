import { useState, Fragment } from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from "axios";

export default function CheckItemDialog({ itemContent, openDialog, handleClose }) {
    const dialogTitle = (flag) => {
        if(flag) {
            return "成功：已完工並預約下次保養！";
        } else {
            return "注意：無法對未啟用之項目進行預約！";
        }
    };

    return (
        <Fragment>
            <Dialog open={openDialog} onClose={handleClose}
                aria-labelledby="check-dialog-title">
                    <DialogTitle id="check-dialog-title" >
                        {dialogTitle(itemContent.enable)}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Confirm
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}