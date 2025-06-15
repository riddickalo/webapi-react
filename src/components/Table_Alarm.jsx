import React from "react";
import NoData from "./NoData";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "./StyledTable";
import { convertTimeFormat } from "../utils/timeFormat";

export function AlarmSubTable({ data }) {
    const tableHead = ['機台廠區', '機台產線', '機台工作站', '機台名稱', '警報時間', '警報描述'];
    const bodyData = (statusData) => {
        if(statusData == null || statusData.length === 0) {
            return (<NoData />);
        } else {
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.alarm_sn}>
                        <StyledTableCell component={'th'} scope="row" align='center'>
                            {row.Nc_Info.region}
                        </StyledTableCell>
                        <StyledTableCell align='center'>{row.Nc_Info.prod_line}</StyledTableCell>
                        <StyledTableCell align='center'>{row.Nc_Info.station}</StyledTableCell>
                        <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                        <StyledTableCell align='center'>{convertTimeFormat(row.alarm_timestamp)}</StyledTableCell>
                        <StyledTableCell align='center'>{row.alarm_msg}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    }

    return <StyledSubTable
                ariaLabel='Alarm-SubTable'
                headData={tableHead}
                bodyData={bodyData(data)} />;
}
// Alarm subtable for popover
export function AlarmPopTable ({ data }) {
    const bodyData = (statusData) => {
        if(statusData == null || statusData.length === 0) {
            return null;
        } else {
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.alarm_sn}>
                        <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                        <StyledTableCell align='center'>{convertTimeFormat(row.alarm_timestamp)}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    }
    return <StyledSubTable
                ariaLabel='Alarm-PopTable'
                headData={[]}
                bodyData={bodyData(data)} />;
}

// function createData(region, prod_line, station, nc_id, timestamp, desc) {
//     return { region, prod_line, station, nc_id, timestamp, desc };
// }

// const demoData = [
//     createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/08/05 12:53:25', '警報'),
//     createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/08/05 12:52:14', '警報'),
//     createData('總部', 'RG', '內溝研磨', 'GI-700-3', '2024/08/04 09:12:01', '安全門開啟'),
//     createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 15:36:36', '通訊錯誤: HMI中斷連線'),
//     createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 15:35:25', '通訊錯誤: HMI中斷連線'),
//     createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 13:58:09', '通訊錯誤: HMI中斷連線'),
//     createData('一廠', 'MG', '內溝研磨', 'GI-700-4', '2024/07/29 16:44:48', '安全門開啟'),
//     createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/29 08:37:27', 'A1 驅動器過載'),
//     createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/07/20 14:14:55', '警報'),
//     createData('總部', 'RG', '內溝研磨', 'GI-700-3', '2024/07/19 14:55:32', '安全門開啟'),
//     createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/11 13:50:11', '示教器警報'),
//     createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/07/08 12:53:25', '通訊錯誤: HMI中斷連線'),
//     createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/02 19:10:17', '示教器警報'),
//     createData('一廠', 'MG', '內溝研磨', 'GI-700-4', '2024/06/30 16:14:52', '安全門開啟'),
//     createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/06/29 10:16:30', 'A1 驅動器過載'),
//     createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/06/21 17:29:22', '通訊錯誤: HMI中斷連線'),
    
// ];