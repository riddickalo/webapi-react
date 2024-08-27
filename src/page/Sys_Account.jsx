import React, { useState } from "react";
import { TableBody, TableRow, TableContainer, Paper, Table, TableHead, Box, Button, Stack, Typography } from "@mui/material";
import { PersonAddAltRounded, CheckCircleOutlineRounded, HighlightOffRounded, PersonRemoveRounded, CreateRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";
import { green, red } from "@mui/material/colors";
import NoData from '../components/NoData'
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";

function StatusIcon(actStatus) {
    return (
        <Box>
            {
                (actStatus)? <div><CheckCircleOutlineRounded /> 啟用</div> : <div><HighlightOffRounded /> 停用</div>
            }              
        </Box>
    );
}

function EditButtons() {
    return(
        <Stack direction='row' spacing={2}>
            <Button sx={{ color: 'white', bgcolor: green[600], ':hover': {bgcolor: green[800]} }} 
                startIcon={<CreateRounded />}>編輯</Button>
            <Button sx={{ color: 'white', bgcolor: red[600], ':hover': {bgcolor: red[800]} }} 
                startIcon={<PersonRemoveRounded />}>停用</Button>
        </Stack>
    );
}

function accountData(account, alias, lastLogTime, actStatus, butts) {
    return { account, alias, lastLogTime, actStatus, butts };
}

const demoData = [accountData('admin', 'SuperUser', '', true, EditButtons())];

function AccountSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='account table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">使用者帳號</StyledTableCell>
                        <StyledTableCell align="center">使用者暱稱</StyledTableCell>
                        <StyledTableCell align="center">最後登入時間</StyledTableCell>
                        <StyledTableCell align="center">啟用狀態</StyledTableCell>
                        <StyledTableCell align="center">操作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {demoData.map((row) => (
                        <StyledTableRow key={row.region}>
                            <StyledTableCell component={'th'} scope="row" align='center'>
                                {row.account}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.alias}</StyledTableCell>
                            <StyledTableCell align='center'>{row.lastLogTime}</StyledTableCell>
                            <StyledTableCell align='center'>{StatusIcon(row.actStatus)}</StyledTableCell>
                            <StyledTableCell align='center'>{row.butts}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function Sys_Account() {
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
                    使用者管理
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<PersonAddAltRounded sx={{ mr: '3px' }} />} > 
                    新增帳號
                </Button>
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={2} mb={5}>
                {AccountSubTable()}
            </Box>
        </Stack>
    );
}