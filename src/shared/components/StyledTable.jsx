import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, tableCellClasses, styled, Paper } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)({
  maxWidth: '100%',
  overflowX: 'auto',
})

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6f92be',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    whiteSpace: 'nowrap',
  }));
  
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function StyledTableHead({ data }) {
  let tableHead = [];
  data.forEach(element => tableHead.push(<StyledTableCell align="center">{element}</StyledTableCell>));
  
  return <TableRow>{tableHead}</TableRow>;
}

export function StyledSubTable(props) {
  return (
    <TableContainer component={Paper} maxWidth='100%' overflowX='auto' sx={{ width: '100%' }}>
      <Table aria-label={ props.ariaLabel }>
        <TableHead>{ <StyledTableHead data={props.headData} />}</TableHead>
        <TableBody>{ props.bodyData }</TableBody>
      </Table>
    </TableContainer>
  );
}