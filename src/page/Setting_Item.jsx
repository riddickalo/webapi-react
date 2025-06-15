import React, { useEffect, useState } from "react";
import { MenuItem, Collapse, TextField, Grid, Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, NoteAddRounded } from '@mui/icons-material';
import NoData from "../components/NoData";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

const itemTypes = [
    { code: 0, key: 'all', value: '全部' },
    { code: 1, key: 'product', value: '成品' },
    { code: 2, key: 'semi-product', value: '半成品' },
    { code: 3, key: 'material', value: '原料' },
];


function ItemSubTable(props) {
    const tableHead = ['品項料號', '品項名稱', '品項類型', '操作'];
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
                    </StyledTableRow>
            )));
        }
    }

    return <StyledSubTable
                ariaLabel='settingItem-subtable'
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
                        <TextField label='品項料號' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='品項名稱' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='品項類型' select >
                            {itemTypes.map((choice) => (
                                <MenuItem key={choice.key} value={choice.value}>
                                    {choice.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Button variant="contained"
                                sx={{ color: '#010101', bgcolor: '#eeeeee', ':hover': { bgcolor: '#d3d3d3' } }}>
                                查詢</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Button variant="contained"
                                sx={{ color: '#ffffff', bgcolor: '#bfbfbf', ':hover': { bgcolor: '#b5b5b5' } }}>
                                清除篩選</Button>
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
                        <TextField label='品項料號' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='品項名稱' />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField select label='品項類型' >
                            {itemTypes.map((choice) => (
                                <MenuItem key={choice.key} value={choice.value}>
                                    {choice.value}
                                </MenuItem>
                            ))}
                        </TextField>
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

export default function Setting_Item() {
    const [showSection, setShowSection] = useState('search');
    const [itemData, setItemData] = useState(null);

    const toggleSection = (sectionName)=>{
        setShowSection(showSection === sectionName? null: sectionName);
    }

    // useEffect(() => {
    //     setItemData(demo)
    // })

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    品項料號
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ () => toggleSection('search') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
                <Button className="icon" 
                    variant="text" 
                    onClick={ () => toggleSection('add') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<NoteAddRounded sx={{ mr: '3px' }} />} > 
                    新增品項料號
                </Button>
            </Stack>
            {<DataSearchSection showSection={ showSection } />}
            {<AddItemSection showSection={ showSection } />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<ItemSubTable data={itemData} />}
            </Box>
        </Stack>
    );
}