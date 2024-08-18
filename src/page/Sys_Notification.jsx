import React, { useState } from "react";
import { Tabs, Tab, Grid, TextField, MenuItem, Box, Button, Card, CardContent, Divider, IconButton, Stack, Typography, Switch } from "@mui/material";
import { SaveRounded } from '@mui/icons-material';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div 
            role='notifypanel'
            hidden={value !== index}
            id={`notifypanel-${index}`}
            aria-labelledby={`table-tab-${index}`}
            {...other} >
                {value === index && <Box sx={{ p: 3 }}> {children} </Box>}
        </div>
    );
}

function allyProps(index) {
    return {
        id: `table-tab-${index}`,
        'aria-controls': `notifypanel-${index}`,
    };
}

function linePanel() {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
            <Grid container width={'100%'} spacing={2}
                    sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign={'left'}>即時警報通知</Typography>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>啟用狀態: </Typography>
                </Grid>
                <Grid item xs={9} align={'left'}>
                    <Switch defaultChecked/>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>Line Token: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='LineToken' defaultValue={'37v9RzV9SWv7pHEYHEkzzYGwmoeDeLDdn3Hw1iOQaj3'} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>訊息語言: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='MsgLang' defaultValue={'en'} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>時區: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='TimeZone' defaultValue={'Taipei'} sx={{ width: '100%' }} />
                </Grid>
            </Grid>
            <Grid container width={'100%'} spacing={2}
                    sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign={'left'}>當日產量通知</Typography>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>啟用狀態: </Typography>
                </Grid>
                <Grid item xs={9} align={'left'}>
                    <Switch />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>Line Token: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='LineToken' sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>訊息語言: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='NotifyTime' defaultValue={'10:00'} sx={{ width: '100%' }} />
                </Grid>
            </Grid>
            <Button 
                variant="contained" startIcon={<SaveRounded />}
                sx={{ bgcolor: '#20B2AA', width: '100%', marginBottom: 3 }}>
                    儲存設定
            </Button>
        </Stack>
    );
}

function emailPanel() {
    return (
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
            <Grid container width={'100%'} rowSpacing={2} columnSpacing={2}
                    sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign={'left'}>寄信參數</Typography>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>SMTP: </Typography>
                </Grid>
                <Grid item xs={3}>
                <TextField label='SMTP' defaultValue={'mail.jacktech.com.tw'} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={2}>
                    <Typography variant="h6" textAlign={'left'}>Port: </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='port no.' defaultValue={'587'} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>信箱帳號: </Typography>
                </Grid>
                <Grid item xs={3}>
                <TextField label='Email account' defaultValue={''} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={2}>
                    <Typography variant="h6" textAlign={'left'}>信箱密碼: </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='Email password' defaultValue={''} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>寄件者地址: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='From: ' defaultValue={'auto@jacktech.com.tw'} sx={{ width: '100%' }} />
                </Grid>
            </Grid>
            <Grid container width={'100%'} spacing={2}
                    sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign={'left'}>即時警報通知</Typography>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>啟用狀態: </Typography>
                </Grid>
                <Grid item xs={9} align={'left'}>
                    <Switch />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>收件者: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='To: ' defaultValue={''} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>副本: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='cc' defaultValue={''} sx={{ width: '100%' }} />
                </Grid>
            </Grid>
            <Grid container width={'100%'} spacing={2}
                    sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h5" textAlign={'left'}>當日產量通知</Typography>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>啟用狀態: </Typography>
                </Grid>
                <Grid item xs={9} align={'left'}>
                    <Switch />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>收件者: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='To: ' defaultValue={'jack@jacktech.com.tw'} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>副本: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='cc' defaultValue={''} sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>訊息語言: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='NotifyTime' defaultValue={'10:00'} sx={{ width: '100%' }} />
                </Grid>
            </Grid>
            <Button 
                variant="contained" startIcon={<SaveRounded />}
                sx={{ bgcolor: '#20B2AA', width: '100%', marginBottom: 3 }}>
                    儲存設定
            </Button>
        </Stack>
    );
}

export default function Sys_Notification() {
    const [value, setValus] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValus(newValue);
    };

    return (
        <Stack direction='column' mx='5%' Spacing={2}>
            <Stack className="layoutHead" 
                direction="column" 
                spacing='15px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    通知設定
                </Typography>
            </Stack>

            <Stack className="layouContent" direction='row' spacing={2} mt={2} alignItems='center'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, BorderColor: 'divider', borderRadius: 2, backgroundColor: '#f0f0f0' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="ncMaintain tabs" centered variant="fullWidth">
                            <Tab label='Line' {...allyProps(0)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                            <Tab label='E-Mail' {...allyProps(1)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {linePanel()}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {emailPanel()}
                    </CustomTabPanel>
                </Box>
            </Stack>
        </Stack>
    );
}