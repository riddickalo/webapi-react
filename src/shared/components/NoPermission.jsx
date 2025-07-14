import React from "react";
import { Stack, Typography } from "@mui/material";
import { NoAccounts } from "@mui/icons-material";

export default function NoPermission(props) {
    return (
        <Stack ml={1.5} spacing={1} direction={'row'} sx={{ alignItems: 'center', whiteSpace: 'nowrap' }} {...props}>
            <NoAccounts />
            <Typography variant="h6">沒有權限存取本頁面</Typography>
        </Stack>
    );
}