import { Button, Stack, Grid, Typography, TextField, Switch } from "@mui/material";
import { SaveRounded } from "@mui/icons-material";
import { useState } from "react";

export default function LinePanel({ onSubmit, onChange, status }) {

    const handleTextChange = ({target, }) => onChange(target.name, target.value);
    const handleSwitchChange = ({target, }) => onChange(target.name, target.checked);

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
                    <Switch name="line_alarm_status" onChange={handleSwitchChange}
                        checked={status.line_alarm_status} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>Line Token: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='LineToken' sx={{ width: '100%' }} onChange={handleTextChange}
                        name="line_alarm_token" value={status.line_alarm_token} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>訊息語言: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='MsgLang' sx={{ width: '100%' }} onChange={handleTextChange}
                        name="line_alarm_ln" value={status.line_alarm_ln} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>時區: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='TimeZone' sx={{ width: '100%' }} onChange={handleTextChange}
                        name="line_alarm_timezone" value={status.line_alarm_timezone}  />
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
                    <Switch name="line_daily_status" onChange={handleSwitchChange}
                        value={status.line_daily_status}/>
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>Line Token: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='LineToken' sx={{ width: '100%' }} onChange={handleTextChange}
                        name="line_daily_token" value={status.line_daily_token} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>通知時間: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='NotifyTime' sx={{ width: '100%' }} onChange={handleTextChange}
                        name="line_daily_time" value={status.line_daily_time} />
                </Grid>
            </Grid>
            <Button 
                variant="contained" startIcon={<SaveRounded />} onClick={onSubmit}
                sx={{ bgcolor: '#20B2AA', width: '100%', marginBottom: 3 }}>
                    儲存設定
            </Button>
        </Stack>
    );
}