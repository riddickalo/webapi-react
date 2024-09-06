import React from 'react';
import { Button, TableContainer, Paper, Table, TableRow, TableHead, TableBody } from "@mui/material";
import { FileDownloadRounded } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow } from "../components/StyledTable";

export default function ReportSubTable({ onDownload }) {
    const tableHead = ['報表', '報表類型', '操作'];
    const tableContents = [
        { label: '機台產量 (月)', key: 'nc_month' }, { label: '機台產量 (日)', key: 'nc_day' }, { label: '機台產量 (時)', key: 'nc_hour' },
        { label: '加工項目產量 (月)', key: 'item_month' }, { label: '加工項目產量 (日)', key: 'item_day' }, { label: '加工項目產量 (時)', key: 'item_hour' },
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-label='Report-Sub-Table'>
                <TableHead>
                    <TableRow>
                        {tableHead.map(element => (
                            <StyledTableCell align="center">{element}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ '.p': { fontWeight: 'bold'} }}>
                    {tableContents.map(row => (
                        <StyledTableRow key={row.key}>
                            <StyledTableCell align='center'>{row.label}</StyledTableCell>
                            <StyledTableCell align='center'>系統報表</StyledTableCell>
                            <StyledTableCell align='center'>
                                <GetReportButton name={row.key} handleClick={onDownload} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function GetReportButton({ name, handleClick }) {
    return (
        <Button variant="contained" startIcon={<FileDownloadRounded />}
            name={name} onClick={handleClick}
            sx={{ bgcolor: '#20B2AA', ':hover': { bgcolor: '#1c9c95' } }}>
            下載
        </Button>
    );
}