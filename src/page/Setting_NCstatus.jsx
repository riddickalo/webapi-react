import React, { useState } from "react";
import { Collapse, TextField, Grid, Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import NoData from "../components/NoData";
import { StatusIcon, MaintainIcon } from "../components/Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

function StatusSubTable(props) {
    const tableHead = ['機台IP', '機台廠區', '機台產線', '機台工作站', '機台名稱', '控制器類型', '操作']
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
                ariaLabel='settingStatus-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

function DataSearchSection({ showSection }) {
    return (
        <Collapse in={showSection}>
            <Box m={1} alignContent='center' alignItems='center' maxWidth='95%' 
                sx={{ 
                    bgcolor: '#e0e0e0',
                    border: '3px solid #5e75ae',
                    borderRadius: 2,
                    '& .MuiTextField-root': { width: "90%" },
                    '& .MuiButton-root': { width: "90%" },
                    '.p': { fontSize: '16px' }, }} > 
                <Grid container mt={1} mb={4} spacing={2} width='100%'>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台廠區' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台產線' />
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField label='機台工作站'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台名稱' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained"
                                sx={{bgcolor: '#027dbc' }}>
                                查詢</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained"
                                sx={{bgcolor: '#70b9dc', color: 'black' }}>
                                清除篩選</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default function Setting_NCStatus() {
    const [statusData, setStatusData] = useState(null);
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
                    機台參數
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
            </Stack>
            {<DataSearchSection showSection={showSection} />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<StatusSubTable data={statusData} />}
            </Box>
        </Stack>
    );
}