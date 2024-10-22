import React, { useState, useEffect } from "react";
import axios from "axios";
import NoData from "../components/NoData";
import { TextField, Stack } from "@mui/material";
import { MaintainEnabledIcon, EditMaintainButton, SaveMaintainItemButton, DeleteMaintainItemButton } from "../components/Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

export default function SettingMaintainSubTable({ data, isEdit, editItem, handleTrigger, handleChange }) {
    // handle editItem change  
    const handleClick = ({target}) => handleChange(target.name, !editItem[target.name]);
    const handleTextChange = ({target}) => handleChange(target.name, target.value);
    
    const tableHead = ['項次', '保養項目', '保養週期(天)', '自動啟用', '操作'];
    const bodyData = (statusData, handleTrigger) => {
        if(statusData === null || statusData.length === 0) {
            return (<NoData />);
        } else {
            let item_count = 1;
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.sn}>
                        <StyledTableCell component={'th'} scope="row" align='center'>
                            {item_count++}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.sn)?
                                <TextField size='small' name={`item`} value={editItem.item} onChange={handleTextChange} />:
                                row.item}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.sn)?
                                <TextField size='small' name={`period`} value={editItem.period} onChange={handleTextChange} />:
                                row.period}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.sn)? <MaintainEnabledIcon name={`enable`} onClick={handleClick} status={editItem.enable} />:
                                <MaintainEnabledIcon status={row.enable} />}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.sn)? 
                                <Stack spacing={2} direction={'row'} alignContent={'center'} justifyContent={'center'}>
                                    <SaveMaintainItemButton id={`Save-${row.sn}`} onClick={handleTrigger} />
                                    <DeleteMaintainItemButton id={`Del-${row.sn}`} onClick={handleTrigger} />
                                </Stack>:
                                <EditMaintainButton id={`Edit-${row.sn}`} onClick={handleTrigger} />}
                        </StyledTableCell>
                    </StyledTableRow>
            )));
        }
    } 

    return <StyledSubTable
                ariaLabel='SettingMaintain-SubTable'
                headData={tableHead}
                bodyData={bodyData(data, handleTrigger)} />;
}