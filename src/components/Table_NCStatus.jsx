import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "./StyledTable";
import { StatusIcon, MaintainIcon } from "./Icons";
import NoData from "./NoData";

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

const tableHead = ['機台廠區', '機台產線', '機台工作站', '機台名稱', '運行狀態', '加工程式', '保養狀態'];

export default function Table_NCStatus() {
    const [statusData, setStatusData] = useState(null);

    useEffect(() => {
        // setStatusData(demoData);

        axios.get(process.env.REACT_APP_API_URL + '/machine/status')
            .then(({data, }) => {
                console.log(data);
                setStatusData(data);
            }).catch((err) => console.error(err));
    }, []);

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
                ariaLabel='ncStatus-table' 
                headData={tableHead}
                bodyData={bodyData(statusData)} />;
}