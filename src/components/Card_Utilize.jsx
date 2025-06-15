import React from "react";
import { Card, CardHeader, CardContent, Divider, Box, Grid, Button, CircularProgress, Typography, Stack } from "@mui/material";
import { StatusIcon, MaintainIcon } from "./Icons";

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
export default function Card_Utilize(props) {
    return (
        <Card sx={{ minWidth: 280, maxWidth: 500, bgcolor: '#6f92be', borderRadius: 3,
                    display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
            <CardHeader 
                avatar={<StatusIcon status={props.opStatus} />}
                title={props.nc_id} 
                titleTypographyProps={{variant: 'h5', fontWeight: 'bold'}}
                // subheader={props.region}
                subheaderTypographyProps={{variant: 'h6', fontWeight: 'bold', marginTop: 1}} 
                sx={{color: 'white'}}>
            </CardHeader>
            <Divider variant="middle" sx={dividerStyle} />
            <CardContent sx={{ color: 'white', flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sx={{ alignContent: 'center' }}>
                        <CircularProgressWithLabel value={props.utilize_rate}/>
                    </Grid>
                    {/* <Divider variant="middle" orientation='vertical' sx={dividerStyle} flexItem/> */}
                    <Grid item xs={6} sx={{ textAlign: 'center', whiteSpace: 'pre-line' }} >
                        <Stack direction={'column'} spacing={1}>
                            <Typography variant="body2" textAlign='left'>機台產線</Typography> 
                            <Typography variant="h6">{props.prod_line}</Typography> 
                            <Typography variant="body2" textAlign='left'>機台工作站</Typography> 
                            <Typography variant="h6">{props.station}</Typography> 
                            <Typography variant="body2" textAlign='left'>加工程式</Typography> 
                            <Typography variant="h6">{props.ncfile}</Typography> 
                            <Typography variant="body2" textAlign='left'>保養狀態</Typography> 
                            <Typography variant="h6">{<MaintainIcon status={props.maintainStatus} />}</Typography> 
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
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

