import React, { useState } from "react";
import { styled, TableCell, tableCellClasses, Collapse, TextField, Grid, tableClasses, TableRow, Paper, Table, TableHead, TableContainer, Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import NoData from "../components/NoData";

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

function statusSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='nc_status table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">機台IP</StyledTableCell>
                        <StyledTableCell align="center">機台廠區</StyledTableCell>
                        <StyledTableCell align="center">機台產線</StyledTableCell>
                        <StyledTableCell align="center">機台工作站</StyledTableCell>
                        <StyledTableCell align="center">機台名稱</StyledTableCell>
                        <StyledTableCell align="center">控制器類型</StyledTableCell>
                        <StyledTableCell align="center">操作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <NoData />
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

export default function Setting_NCStatus() {
    const [showSection, setShowSection] = useState(true);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    機台參數
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
            </Stack>
            {DataSearchSection({showSection})}
            <Box className="layoutContent" mt={2} mb={3}>
                {statusSubTable()}
            </Box>
        </Stack>
    );
}