import React from "react";
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, Paper } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

function createData(region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus) {
    return { region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus };
}

const demoData = [
    createData('總部', 'RG', '內溝研磨', 'GI-700-3', 'alarm', 'O999', true),
    createData('總部', 'RG', '平測磨', 'SG-500-1', 'idle', 'G100', false),
    createData('一廠', 'MG', '內溝研磨', 'GI-700-4', 'running', 'O991', true),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', 'running', 'Main.tch', false),
    createData('二廠', 'EG', '裝配', 'GI-700-3', 'idle', 'O999', false),
];
const statusData = demoData;

function statusIcon(status) {
    let content = {};
    if (status === 'alarm') {
        content = { color: 'red', op: '警報'};
    } else if (status === 'idle') {
        content = { color: 'orange', op: '閒置中'};
    } else if (status === 'running') {
        content = { color: 'green', op: '運轉中'};
    }

    return(
        <Button disableTouchRipple size="small" variant="contained" sx={{ bgcolor: content.color, "&:hover": {bgcolor: content.color} }}>
            {content.op}
        </Button>
    );
}

function maintainIcon(status) {
    let content = {};
    if (status) {
        content = { color: 'green', op: '預約'};
    } else {
        content = { color: 'grey.500', op: '未啟用'};
    }

    return(
        <Button disableTouchRipple size="small" variant="contained" sx={{ bgcolor: content.color, '&: hover': {bgcolor: content.color} }}>
            {content.op}
        </Button>
    );
}

export default function Table_NCStatus() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='nc_status table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">機台廠區</StyledTableCell>
                        <StyledTableCell align="center">機台產線</StyledTableCell>
                        <StyledTableCell align="center">機台工作站</StyledTableCell>
                        <StyledTableCell align="center">機台名稱</StyledTableCell>
                        <StyledTableCell align="center">運行狀態</StyledTableCell>
                        <StyledTableCell align="center">加工程式</StyledTableCell>
                        <StyledTableCell align="center">保養狀態</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {statusData.map((row) => (
                        <StyledTableRow key={row.nc_id}>
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
                </TableBody>
            </Table>
        </TableContainer>
    );
}