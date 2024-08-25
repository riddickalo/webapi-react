import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Button, Table, TableContainer, TableHead, TableBody, TableRow, Paper, dividerClasses } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import NoData from "./NoData";
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
        <Button disableRipple={true} size="small" variant="contained" sx={{ bgcolor: content.color }}>
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
        <Button disableRipple={true} size="small" variant="contained" sx={{ bgcolor: content.color }}>
            {content.op}
        </Button>
    );
}

function recordSubTable() {
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='status table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">機台名稱</StyledTableCell>
                        <StyledTableCell align="center">加工程式</StyledTableCell>
                        <StyledTableCell align="center">加工時間</StyledTableCell>
                        <StyledTableCell align="center">加工開始時間</StyledTableCell>
                        <StyledTableCell align="center">加工完成時間</StyledTableCell>
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

function updateSubTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='record table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">機台名稱</StyledTableCell>
                        <StyledTableCell align="center">操作類型</StyledTableCell>
                        <StyledTableCell align="center">操作時間</StyledTableCell>
                        <StyledTableCell align="center">加工程式名稱</StyledTableCell>
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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div 
            role='tablepanel'
            hidden={value !== index}
            id={`tablepanel-${index}`}
            aria-labelledby={`table-tab-${index}`}
            {...other} >
                {value === index && <Box sx={{ p: 3 }}> {children} </Box>}
        </div>
    );
}

function allyProps(index) {
    return {
        id: `table-tab-${index}`,
        'aria-controls': `tablepanel-${index}`,
    };
}

export default function Table_NCFile() {
    const [value, setValus] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValus(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, BorderColor: 'divider', borderRadius: 2, backgroundColor: '#f0f0f0' }}>
                <Tabs value={value} onChange={handleChange} aria-label="ncMaintain tabs" centered variant="fullWidth">
                    <Tab label='加工紀錄' {...allyProps(0)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                    <Tab label='檔案紀錄' {...allyProps(1)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {recordSubTable()}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {updateSubTable()}
            </CustomTabPanel>
        </Box>
    );
}