import React, { useState } from "react";
import { FormControlLabel, Checkbox, Collapse, Box, Button, Stack, Typography, Grid, TextField } from "@mui/material";
import { FindInPageRounded, NoteAddRounded } from '@mui/icons-material';
import NoData from "../components/NoData";
import { StatusIcon } from "../components/Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

function MaintainSubTable(props) {
    const tableHead = ['項次', '保養項目', '機台週期(天)', '自動啟用', '操作'];

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
                    
                    </StyledTableRow>
            )));
        }
    } 

    return <StyledSubTable
                ariaLabel='settingMaintain-subtable'
                headData={tableHead}
                bodyData={bodyData(props.data)} />;
}

function DataSearchSection({ showSection }) {
    return (
        <Collapse in={showSection === 'search'}>
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
                        <Button variant="contained"
                                sx={{ color: '#010101', bgcolor: '#bfbfbf', ':hover': { bgcolor: '#8e8e8e' } }}>
                                查詢</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

function AddItemSection({ showSection }) {
    return (
        <Collapse in={showSection === 'add'}>
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
                        <TextField label='機台名稱' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='保養項目' />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField label='保養週期(天)'/>
                    </Grid>
                    <Grid item xs={12} align={'left'} ml={4}>
                        <FormControlLabel control={<Checkbox />} 
                            label='自動啟用: ' labelPlacement="start" sx={{ color: '#030303' }} />
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

export default function Setting_Maintain() {
    const [maintainData, setMaintainData] = useState(null);
    const [showSection, setShowSection] = useState('search');

    const toggleSection = (sectionName) => {
        setShowSection(showSection === sectionName? null: sectionName);
    }

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    機台保養項目
                </Typography>
                <Button className="icon-search" 
                    variant="text" 
                    onClick={ () => toggleSection('search') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
                <Button className="icon-add" 
                    variant="text" 
                    onClick={ () => toggleSection('add') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<NoteAddRounded sx={{ mr: '3px' }} />} > 
                    新增保養項目
                </Button>
            </Stack>
            {<DataSearchSection showSection={ showSection } />}
            {<AddItemSection showSection={ showSection } />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<MaintainSubTable data={maintainData} />}
            </Box>
        </Stack>
    );
}