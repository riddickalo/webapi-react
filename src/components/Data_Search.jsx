import React from "react";
import { Collapse, Box, Grid, Button, TextField, MenuItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function DataSearchSection({ showSection }) {
    return (
        <Collapse in={showSection}>
            <Box m={1} alignContent='center' alignItems='center' maxWidth='95%' 
                sx={{ 
                    bgcolor: '#e0e0e0',
                    border: '3px solid #5e75ae',
                    borderRadius: 2,
                    '& .MuiTextField-root': { width: "90%" },
                    '& .MuiButton-root': { width: "90%" },
                    '.p': { fontSize: '16px' }, }} > 
                <Grid container mt={1} mb={4} spacing={2} width='100%'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-TW">
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker 
                                format="YYYY/MM/DD hh:mm"
                                label='警報區間 (起)' 
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                ampm={false} />    
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DateTimePicker 
                                format="YYYY/MM/DD hh:mm"
                                label='警報區間 (迄)' 
                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                ampm={false} />    
                        </Grid>
                    </LocalizationProvider>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台廠區' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台產線' />
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField label='機台工作站'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台名稱' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained"
                                sx={{bgcolor: '#027dbc' }}>
                                查詢</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained"
                                sx={{bgcolor: '#70b9dc', color: 'black' }}>
                                清除篩選</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default DataSearchSection;