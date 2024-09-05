import React from "react";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "./StyledTable";
import { StatusIcon, MaintainIcon } from "./Icons";
import NoData from "./NoData";

const tableHead = ['機台廠區', '機台產線', '機台工作站', '機台名稱', '運行狀態', '加工程式', '保養狀態'];

export default function NCStatusSubTable({ statusData }) {

    const bodyData = (data) => {
        if(data === null || data.length === 0) {
            return (<NoData />);
        } else {
            return (
                data.map((row) => (
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
                ariaLabel='ncStatus-table' 
                headData={tableHead}
                bodyData={bodyData(statusData)} />;
}