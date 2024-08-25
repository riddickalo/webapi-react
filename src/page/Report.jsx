import React, { useState } from "react";
import { Box, Grid, Button, Stack, Typography, TableContainer, Paper, Table, TableRow, TableHead, TableBody } from "@mui/material";
import { FileDownloadRounded } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";

function getReportButton({ key }) {
    return (
        <Button variant="contained" startIcon={<FileDownloadRounded />}
            sx={{ bgcolor: '#20B2AA', ':hover': { bgcolor: '#1c9c95' } }}>
            下載
        </Button>
    );
}

function reportSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='record table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">報表</StyledTableCell>
                        <StyledTableCell align="center">報表類型</StyledTableCell>
                        <StyledTableCell align="center">操作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ '.p': { fontWeight: 'bold'} }}>
                    <StyledTableRow key={'nc_month'}>
                        <StyledTableCell align='center'>機台產量 (月)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('nc_month')}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'nc_day'}>
                        <StyledTableCell align='center'>機台產量 (日)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('nc_day')}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'nc_hour'}>
                        <StyledTableCell align='center'>機台產量 (時)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('nc_hour')}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'item_month'}>
                        <StyledTableCell align='center'>加工項目產量 (月)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('item_month')}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'item_day'}>
                        <StyledTableCell align='center'>加工項目產量 (日)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('item_day')}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'item_hour'}>
                        <StyledTableCell align='center'>加工項目產量 (時)</StyledTableCell>
                        <StyledTableCell align='center'>系統報表</StyledTableCell>
                        <StyledTableCell align='center'>{getReportButton('item_hour')}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Order() {
    const [showSection, setShowSection] = useState(true);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    return (
        <Stack direction='column' mx='5%'>                
            <Typography variant="h4" fontWeight={'bold'} mt={'30px'} align="left">
                報表下載
            </Typography>
            <Box my={2} alignContent='center' alignItems='center'
                sx={{ 
                    bgcolor: '#e0e0e0',
                    border: '3px solid #5e75ae',
                    borderRadius: 2,
                    '& .MuiTextField-root': { width: "90%" },
                    '.p': { fontSize: '16px' }, }} >
                    <Grid container mt={1} mb={4} spacing={2} width='100%'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-TW">
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker 
                                    format="YYYY/MM/DD hh:mm"
                                    label='統計區間(起)' 
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    ampm={false} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker 
                                    format="YYYY/MM/DD hh:mm"
                                    label='統計區間 (迄)' 
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    ampm={false} />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
            </Box>
            <Box className="layoutContent" mt={2} mb={3}>
                {reportSubTable()}
            </Box>
        </Stack>
    );
}