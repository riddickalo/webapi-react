import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, dividerClasses } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import NoData from "./NoData";
import { StatusIcon } from "./Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "./StyledTable";


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

function RecordSubTable(props) {
    const tableHead = ['機台名稱', '加工程式', '加工時間', '加工開始時間', '加工完成時間'];

    const bodyData = (statusData) => {
        if(statusData === null) {
            return (<NoData />);
        } else {
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.nc_id}>
                        <StyledTableCell component={'th'} scope="row" align='center'>
                            {row.region}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{row.prod_line}</StyledTableCell>
                        <StyledTableCell align='center'>{row.station}</StyledTableCell>
                        <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                        <StyledTableCell align='center'>{<StatusIcon status={row.opStatus} />}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    }
    
    return <StyledSubTable
                ariaLabel='ncFile-record-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

function UpdateSubTable(props) {
    const tableHead = ['機台名稱', '操作類型', '操作時間', '加工程式名稱'];

    const bodyData = (statusData) => {
        if(statusData === null) {
            return (<NoData />);
        } else {
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.nc_id}>
                        <StyledTableCell component={'th'} scope="row" align='center'>
                            {row.region}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{row.prod_line}</StyledTableCell>
                        <StyledTableCell align='center'>{row.station}</StyledTableCell>
                        <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    }
    
    return <StyledSubTable
                ariaLabel='ncFile-update-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
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
    const [statusData, setStatusData] = useState(null);
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
                {<RecordSubTable data={statusData} />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {<UpdateSubTable data={statusData} />}
            </CustomTabPanel>
        </Box>
    );
}