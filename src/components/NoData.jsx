import React from "react";
import { Stack, Typography } from "@mui/material";
import { AssignmentLateRounded } from "@mui/icons-material";

export default function NoData(props) {
    return (
        <Stack ml={1.5} spacing={1} direction={'row'} sx={{ alignItems: 'center', whiteSpace: 'nowrap' }} {...props}>
            <AssignmentLateRounded />
            <Typography variant="h6">沒有資料</Typography>
        </Stack>
    );
}