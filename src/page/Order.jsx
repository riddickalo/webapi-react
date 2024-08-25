import React, { useState } from "react";
import { Box, Button, Stack, Typography, TableContainer, Paper, Table, TableRow, TableHead } from "@mui/material";
import { AddRounded, FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import NoData from "../components/NoData";
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";

function orderSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='record table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">工單編號</StyledTableCell>
                        <StyledTableCell align="center">工單名稱</StyledTableCell>
                        <StyledTableCell align="center">客戶編號</StyledTableCell>
                        <StyledTableCell align="center">工單狀態</StyledTableCell>
                        <StyledTableCell align="center">訂單建立日</StyledTableCell>
                        <StyledTableCell align="center">計畫開工日</StyledTableCell>
                        <StyledTableCell align="center">計畫完工日</StyledTableCell>
                        <StyledTableCell align="center">實際開工日</StyledTableCell>
                        <StyledTableCell align="center">實際完工日</StyledTableCell>
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

export default function Order() {
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
                    工單清單
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={2} mb={3}>
                {orderSubTable()}
            </Box>
        </Stack>
    );
}