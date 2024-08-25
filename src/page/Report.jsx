import React, { useState } from "react";
import { Box, Grid, Button, Stack, Typography, TableContainer, Paper, Table, TableRow, styled, TableCell, tableCellClasses, TableHead } from "@mui/material";
import { AddRounded, FilterAltRounded } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6f92be',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

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
                {/* <TableBody>
                    {demoData.map((row) => (
                        <StyledTableRow key={row.region}>
                            <StyledTableCell component={'th'} scope="row" align='center'>
                                {row.region}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.prod_line}</StyledTableCell>
                            <StyledTableCell align='center'>{row.station}</StyledTableCell>
                            <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                            <StyledTableCell align='center'>{statusIcon(row.opStatus)}</StyledTableCell>
                            <StyledTableCell align='center'>{row.ncfile}</StyledTableCell>
                            <StyledTableCell align='center'>{maintainIcon(row.maintainStatus)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody> */}
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