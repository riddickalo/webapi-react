import React, { useState } from "react";
import { Collapse, TextField, Grid, Box, Button, Stack, Typography } from "@mui/material";
import { AddRounded } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow, StyledSubTable } from "../components/StyledTable";
import NoData from "../components/NoData";

function FileSubTable(props) {
    const tableHead = ['加工程式', '加工品項', '操作'];

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
                    
                    </StyledTableRow>
            )));
        }
    }

    return <StyledSubTable
                ariaLabel='settingPPmap-file-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

function AddItemSection({ showSection }) {
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
                    <Grid item xs={12}>
                        <TextField label='機台名稱' select />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='加工程式' select disabled/>
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField label='加工品項' select />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"
                                sx={{ bgcolor: '#20B2AA', ':hover': { bgcolor: '#1c9c95' } }}>
                                送出</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default function Setting_PPmap() {
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
                    加工程式與品項
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<AddRounded sx={{ mr: '3px' }} />} > 
                    新增對照資料
                </Button>
            </Stack>
            {<AddItemSection showSection={ showSection } />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<FileSubTable data={statusData} />}
            </Box>
        </Stack>
    );
}