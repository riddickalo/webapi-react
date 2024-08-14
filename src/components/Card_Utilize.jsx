import React from "react";
import { Card, Box, Grid, Button, CircularProgress, Typography, Stack } from "@mui/material";

function statusIcon(status) {
    let content = {};
    if (status === 'alarm') {
        content = { color: 'red', op: '警報'};
    } else if (status === 'idle') {
        content = { color: 'orange', op: '閒置中'};
    } else if (status === 'running') {
        content = { color: 'green', op: '運轉中'};
    }

    return(
        <Button disableRipple={true} size="small" variant="contained" sx={{ bgcolor: content.color }}>
            {content.op}
        </Button>
    );
}

export default function Card_Utilize() {
    return (
        <Box sx={{ width: '300px', height: '200px'}}>
            <Grid container border={'2px solid'}>
                <Grid item xs={12}>
                    <Stack direction={'row'}>
                        {statusIcon('idle')}
                        <Stack direction={'column'}>
                            <Typography variant="h4" align="left">IFC</Typography>
                            <Typography variant="h5" align="left">總部</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <CircularProgress variant="determinate" value={50} />
                </Grid>
                <Grid xs={6}>
                    <Stack direction={'column'}>
                        <Typography variant="h6" align='left'>機台產線</Typography>
                        <Typography variant="h6" align='center'>LNC</Typography>
                        <Typography variant="h6" align='left'>機台工作站</Typography>
                        <Typography variant="h6" align='center'>實驗室</Typography>
                        <Typography variant="h6" align='left'>加工程式</Typography>
                        <Typography variant="h6" align='center'>O999</Typography>
                        <Typography variant="h6" align='left'>保養狀態</Typography>
                        <Typography variant="h6" align='center'>預約</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}