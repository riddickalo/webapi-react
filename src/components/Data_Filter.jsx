import React from "react";
import { Collapse, Button, Box, TextField, Grid, MenuItem } from '@mui/material';

const opStatus = [
    {
        key: 'all',
        value: '全部',
    },
    {
        key: 'warning',
        value: '警告',
    },
    {
        key: 'alarm',
        value: '警報',
    },
    {
        key: 'running',
        value: '運轉中',
    },
    {
        key: 'idle',
        value: '閒置中',
    },
    {
        key: 'offline',
        value: '未連線',
    },
    {
        key: 'pause',
        value: '暫停中',
    },
    {
        key: 'teach',
        value: '示教中',
    },
    {
        key: 'unknown',
        value: '未知',
    },
];

export default function DataFilterSection({ showSection }) {
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
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台廠區' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台名稱' />
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField label='機台產線'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label='運行狀態' >{
                            opStatus.map((choice) => {
                                <MenuItem key={choice.value} value={choice.value}>
                                    {choice.value}
                                </MenuItem>
                            })}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained"
                                sx={{bgcolor: '#027dbc' }}>
                                更新篩選</Button>
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
