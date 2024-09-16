import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, dividerClasses } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import NoData from "./NoData";
import { StyledTableCell, StyledTableRow, StyledSubTable } from "./StyledTable";
import { StatusIcon, MaintainIcon } from "./Icons";

export default function NCMaintainSubTable() {
    const [statusData, setStatusData] = useState(null);
    const [value, setValus] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValus(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, BorderColor: 'divider', borderRadius: 2, backgroundColor: '#f0f0f0' }}>
                <Tabs value={value} onChange={handleChange} aria-label="ncMaintain tabs" centered variant="fullWidth">
                    <Tab label='保養狀態' {...allyProps(0)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                    <Tab label='保養紀錄' {...allyProps(1)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <StatusPanel data={statusData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <RecordPanel data={statusData} />
            </CustomTabPanel>
        </Box>
    );
}

function StatusPanel(props) {
    const tableHead = ['項次', '保養項目', '保養週期(天)', '保養狀態', '預約保養時間', '最後保養時間', '啟用狀態', '操作'];

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
                        <StyledTableCell align='center'>{row.ncfile}</StyledTableCell>
                        <StyledTableCell align='center'>{<MaintainIcon status={row.maintainStatus} />}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    } 

    return <StyledSubTable
                ariaLabel='ncMaintain-status-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

function RecordPanel(props) {
    const tableHead = ['保養項目', '保養人員', '預約保養時間', '實際保養時間'];
    
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
                ariaLabel='ncMaintain-record-subtable'
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
