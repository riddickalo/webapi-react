import { Button, Stack, Grid, Typography, TextField, Switch } from "@mui/material";
import { SaveRounded } from "@mui/icons-material";

export default function EmailPanel({ onSubmit, onChange, status }) {

    const handleTextChange = ({target, }) => onChange(target.name, target.value);
    const handleSwitchChange = ({target, }) => onChange(target.name, target.checked);

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
                    <TextField label='SMTP' name='email_smtp' sx={{ width: '100%' }} 
                        onChange={handleTextChange} value={status.email_smtp}  />
                </Grid>
                <Grid item xs={2} ml={2}>
                    <Typography variant="h6" textAlign={'left'}>Port: </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='port no.' name='email_port' sx={{ width: '100%' }}
                        onChange={handleTextChange} value={status.email_port} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>信箱帳號: </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='Email account' name='email_account' sx={{ width: '100%' }} 
                        onChange={handleTextChange} value={status.email_account} />
                </Grid>
                <Grid item xs={2} ml={2}>
                    <Typography variant="h6" textAlign={'left'}>信箱密碼: </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='Email password' name='email_password' sx={{ width: '100%' }} 
                        onChange={handleTextChange} value={status.email_password} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>寄件者地址: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='From: ' name='email_from' sx={{ width: '100%' }} 
                        onChange={handleTextChange} value={status.email_from} />
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
                    <Switch name="email_alarm_status" onChange={handleSwitchChange}
                        checked={status.email_alarm_status} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>收件者: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='To: ' name='email_alarm_to' sx={{ width: '100%' }}
                        onChange={handleTextChange} value={status.email_alarm_to} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>副本: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='cc' name='email_alarm_cc'  sx={{ width: '100%' }}
                    onChange={handleTextChange} value={status.email_alarm_cc} />
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
                    <Switch name='email_date_status' onChange={handleSwitchChange} 
                        checked={status.email_daily_status} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>收件者: </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField label='To: ' name='email_date_to'  sx={{ width: '100%' }}
                        onChange={handleTextChange} value={status.email_daily_to} />
                </Grid>
                <Grid item xs={2} ml={1}>
                    <Typography variant="h6" textAlign={'left'}>副本: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='cc' name='email_date_cc'  sx={{ width: '100%' }}
                        onChange={handleTextChange} value={status.email_daily_cc} />
                </Grid>
                <Grid item xs={2} ml={1} mb={2}>
                    <Typography variant="h6" textAlign={'left'}>訊息語言: </Typography>
                </Grid>
                <Grid item xs={9} mb={2}>
                    <TextField label='NotifyTime' name='email_date_time'  sx={{ width: '100%' }}
                        onChange={handleTextChange} value={status.email_daily_time} />
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