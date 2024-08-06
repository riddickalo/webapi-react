import React from "react";
import { styled, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, tableCellClasses, Paper } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6f92be',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function createData(region, prod_line, station, nc_id, timestamp, desc) {
    return { region, prod_line, station, nc_id, timestamp, desc };
}

const demoData = [
    createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/08/05 12:53:25', '警報'),
    createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/08/05 12:52:14', '警報'),
    createData('總部', 'RG', '內溝研磨', 'GI-700-3', '2024/08/04 09:12:01', '安全門開啟'),
    createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 15:36:36', '通訊錯誤: HMI中斷連線'),
    createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 15:35:25', '通訊錯誤: HMI中斷連線'),
    createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/08/01 13:58:09', '通訊錯誤: HMI中斷連線'),
    createData('一廠', 'MG', '內溝研磨', 'GI-700-4', '2024/07/29 16:44:48', '安全門開啟'),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/29 08:37:27', 'A1 驅動器過載'),
    createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/07/20 14:14:55', '警報'),
    createData('總部', 'RG', '內溝研磨', 'GI-700-3', '2024/07/19 14:55:32', '安全門開啟'),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/11 13:50:11', '示教器警報'),
    createData('總部', 'RG', '平測磨', 'SG-500-1', '2024/07/08 12:53:25', '通訊錯誤: HMI中斷連線'),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/07/02 19:10:17', '示教器警報'),
    createData('一廠', 'MG', '內溝研磨', 'GI-700-4', '2024/06/30 16:14:52', '安全門開啟'),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', '2024/06/29 10:16:30', 'A1 驅動器過載'),
    createData('二廠', 'EG', '裝配', 'GI-700-3', '2024/06/21 17:29:22', '通訊錯誤: HMI中斷連線'),
    
];

export default function Table_Alarm() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-lable='nc_status table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">機台廠區</StyledTableCell>
                        <StyledTableCell align="center">機台產線</StyledTableCell>
                        <StyledTableCell align="center">機台工作站</StyledTableCell>
                        <StyledTableCell align="center">機台名稱</StyledTableCell>
                        <StyledTableCell align="center">警報時間</StyledTableCell>
                        <StyledTableCell align="center">警報描述</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {demoData.map((row) => (
                        <StyledTableRow key={row.region}>
                            <StyledTableCell component={'th'} scope="row" align='center'>
                                {row.region}
                            </StyledTableCell>
                            <StyledTableCell align='center'>{row.prod_line}</StyledTableCell>
                            <StyledTableCell align='center'>{row.station}</StyledTableCell>
                            <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                            <StyledTableCell align='center'>{row.timestamp}</StyledTableCell>
                            <StyledTableCell align='center'>{row.desc}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}