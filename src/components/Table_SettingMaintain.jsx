import React, { useState, useEffect } from "react";
import axios from "axios";
import NoData from "../components/NoData";
import { StatusIcon } from "../components/Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

export default function SettingMaintainSubTable(props) {
    const tableHead = ['項次', '保養項目', '機台週期(天)', '自動啟用', '操作'];

    const bodyData = (statusData) => {
        if(statusData === null || statusData.length === 0) {
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
                ariaLabel='settingMaintain-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}