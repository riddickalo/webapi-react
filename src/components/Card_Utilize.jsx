import React from "react";
import { Card, CardHeader, CardContent, Divider, Box, Grid, Button, CircularProgress, Typography, Stack } from "@mui/material";

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
        <Button disableTouchRipple size="large" variant="contained" sx={{ bgcolor: content.color, '&:hover': { bgcolor: content.color } }}>
            {content.op}
        </Button>
    );
}

function maintainIcon(status) {
    let content = {};
    if (status) {
        content = { color: 'green', op: '預約'};
    } else {
        content = { color: 'grey.500', op: '未啟用'};
    }

    return(
        <Button disableTouchRipple size="small" variant="contained" sx={{ bgcolor: content.color, '&: hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    );
}

const dividerStyle = {
    border: '1px solid',
    color: '#545454', 
}

function CircularProgressWithLabel(props) {
    return(
        <Box sx={{alignItems: 'flex-end'}}>
            <Stack direction={'column'} spacing={5}>
                <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress variant='determinate' 
                        {...props} 
                        size={150} 
                        thickness={5} 
                        sx={{ color: '#6ce5e8' }} />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Typography
                            variant="caption"
                            component="div"
                            sx={{ color: 'white', fontSize: '24px', }}
                        >
                            {`${Math.round(props.value)}%`}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h6">稼動率</Typography>
            </Stack>
        </Box>
    );    
}

/*
    data = {
        region: 廠區,
        prod_line: 機台產線,
        station: 機台工作站,
        nc_id: 機台名稱,
        opStatus: 運行狀態,
        ncfile: 加工程式,
        maintainStatus: 保養狀態,
    }
*/
export default function Card_Utilize({ data }) {
    return (
        <Card sx={{ minWidth: 280, maxWidth: 500, bgcolor: '#6f92be', borderRadius: 3 }}>
            <CardHeader 
                avatar={ statusIcon(data.opStatus) }
                title={data.nc_id} 
                titleTypographyProps={{variant: 'h5'}}
                subheader={data.region}
                subheaderTypographyProps={{variant: 'h6'}} 
                sx={{color: 'white'}}>
            </CardHeader>
            <Divider variant="middle" sx={dividerStyle} />
            <CardContent sx={{ color: 'white' }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sx={{ alignContent:'center' }}>
                        <CircularProgressWithLabel value={data.utilize_rate}/>
                    </Grid>
                    {/* <Divider variant="middle" orientation='vertical' sx={dividerStyle} flexItem/> */}
                    <Grid item xs={6}>
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant="body2">機台產線</Typography> 
                            <Typography variant="h6">{data.prod_line}</Typography> 
                            <Typography variant="body2">機台工作站</Typography> 
                            <Typography variant="h6">{data.station}</Typography> 
                            <Typography variant="body2">加工程式</Typography> 
                            <Typography variant="h6">{data.ncfile}</Typography> 
                            <Typography variant="body2">保養狀態</Typography> 
                            <Typography variant="h6">{maintainIcon(data.maintainStatus)}</Typography> 
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}