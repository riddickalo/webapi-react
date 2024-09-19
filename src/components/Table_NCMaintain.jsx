import { useState } from "react";
import { Tabs, Tab, Box, Stack, dividerClasses } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import NoData from "./NoData";
import { StyledTableCell, StyledTableRow, StyledSubTable } from "./StyledTable";
import { MaintainIcon, MaintainEnabledIcon, EditMaintainButton, CheckMaintainItemButton, BackMaintainItemButton } from "./Icons";
import { convertTimeFormat } from '../utils/timeFormat';

export default function NCMaintainSubTable(props) {
    const [value, setValues] = useState(0);

    const handleChange = (event, newValue) => {
        setValues(newValue);
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
                <MaintainSubPanel label='Item' data={props.maintainData.items} {...props} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <MaintainSubPanel label='Record' data={props.maintainData.records} {...props} />
            </CustomTabPanel>
        </Box>
    );
}

function MaintainSubPanel(props) {
    const tableHead = (props.label === 'Record')? ['保養項目', '保養人員', '預約保養時間', '實際保養時間']:
        ['項次', '保養項目', '保養週期(天)', '保養狀態', '預約保養時間', '最後保養時間', '啟用狀態', '操作'];
        
    const bodyData = (statusData, label, isEdit, editItem, handleClick) => {
        if(statusData === null || statusData.length === 0) {
            return (<NoData />);
        } else {
            if(label === 'Item'){
                let item_count = 1;
                return (
                    statusData.map((row) => (
                        <StyledTableRow key={row.sn}>
                            <StyledTableCell component={'th'} scope="row" align='center'>
                                {item_count++}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.item}</StyledTableCell>
                            <StyledTableCell align='center'>{row.period}</StyledTableCell>
                            <StyledTableCell align='center'>{<MaintainIcon status={row.status} />}</StyledTableCell>
                            <StyledTableCell align='center'>{convertTimeFormat(row.scheduled_check_time)}</StyledTableCell>
                            <StyledTableCell align='center'>{convertTimeFormat(row.last_check_time)}</StyledTableCell>
                            <StyledTableCell align='center'>
                                {<MaintainEnabledIcon status={row.enable} />}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                                {(isEdit === row.sn)? 
                                    <Stack spacing={2} direction={'row'} alignContent={'center'} justifyContent={'center'}>
                                        <CheckMaintainItemButton id={`Check-${row.sn}`} onClick={handleClick} />
                                        <BackMaintainItemButton id={`Back-${row.sn}`} onClick={handleClick} />
                                    </Stack>:
                                    <EditMaintainButton id={`Edit-${row.sn}`} onClick={handleClick} />}
                            </StyledTableCell>
                        </StyledTableRow>
                )));
            } else {
                return (
                    statusData.map((row) => (
                        <StyledTableRow key={row.sn}>
                            <StyledTableCell component={'th'} scope="row" align='center'>
                                    {row.item}
                                </StyledTableCell>
                                <StyledTableCell align='center'>{row.worker}</StyledTableCell>
                                <StyledTableCell align='center'>{convertTimeFormat(row.scheduled_check_time)}</StyledTableCell>
                                <StyledTableCell align='center'>{convertTimeFormat(row.actual_check_time)}</StyledTableCell>
                    
                        </StyledTableRow>
                )));
            }
        }
    }

    return <StyledSubTable
                ariaLabel={`NcMaintain-${props.label}-Subtable`}
                headData={tableHead}
                bodyData={bodyData(props.data, props.label, props.isEdit, props.editItem, props.handleClick)} />;
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
