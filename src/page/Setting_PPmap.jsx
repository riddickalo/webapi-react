import React, { useState } from "react";
import { Collapse, TableRow, TextField, Grid, Paper, Table, TableHead, TableContainer, Box, Button, Stack, Typography } from "@mui/material";
import { AddRounded } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";
import NoData from "../components/NoData";

function FileSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='nc_status table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">加工程式</StyledTableCell>
                        <StyledTableCell align="center">加工品項</StyledTableCell>
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

function AddItemSection({ showSection }) {
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
                    <Grid item xs={12}>
                        <TextField label='機台名稱' select />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='加工程式' select disabled/>
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField label='加工品項' select />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"
                                sx={{ bgcolor: '#20B2AA', ':hover': { bgcolor: '#1c9c95' } }}>
                                送出</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default function Setting_PPmap() {
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
                    加工程式與品項
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<AddRounded sx={{ mr: '3px' }} />} > 
                    新增對照資料
                </Button>
            </Stack>
            {AddItemSection({ showSection })}
            <Box className="layoutContent" mt={2} mb={3}>
                {FileSubTable()}
            </Box>
        </Stack>
    );
}