import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AddRounded, FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import { StatusIcon, MaintainIcon } from "../components/Icons";
import NoData from "../components/NoData";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

function OrderSubTable(props) {
    const tableHead = ['工單編號', '工單名稱', '客戶編號', '工單狀態', '訂單建立日', '計畫開工日', '計畫完工日', '實際開工日', '實際完工日', '操作'];

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
                ariaLabel='order-table' 
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

export default function Order() {
    const [orderData, setOrderData] = useState(null);
    const [showSection, setShowSection] = useState(true);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    工單清單
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={2} mb={3}>
                {<OrderSubTable data={orderData} />}
            </Box>
        </Stack>
    );
}