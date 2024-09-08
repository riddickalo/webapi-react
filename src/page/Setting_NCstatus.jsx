import React, { useState, useEffect } from "react";
import { Collapse, TextField, Grid, Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded } from '@mui/icons-material';
import SettingStatusSubTable from "../components/Table_SettingStatus";
import axios from "axios";

export default function Setting_NCStatus() {
    const [showSection, setShowSection] = useState(true);
    const [statusData, setStatusData] = useState([]);
    const [isEdit, setIsEdit] = useState(null);             // 編輯機台資料
    const [editedStatus, setEditedStatus] = useState(null);
    const [filteredData, setFilteredData] = useState(null); // 篩選資料
    const [filterConditions, setFilterConditions] = useState(initConditions);

    const toggleSection = () => setShowSection(!showSection);

    const handleTriggerEdit = ({target, }) => {
        if(isEdit === target.name && isEdit !== null) {
            axios.post(process.env.REACT_APP_API_URL + '/api/status', editedStatus)
            .then(({data, }) => {
                let updateTarget = [];      // 挑出目前顯示已篩選的資料更新
                filteredData.map(row => updateTarget.push(row.nc_id));
                let updatedData = [];
                for(let row of data) {
                    if(updateTarget.includes(row.nc_id))
                        updatedData.push(row);
                }
                setFilteredData(updatedData);
                setStatusData(data);  
                setIsEdit(null);              
            }).catch(err => console.error(err));        
        } else {
            console.info('set new isEdit', target.name)
            for(let row of filteredData) {
                if(row.nc_id === target.name) {
                    setEditedStatus(row);
                    setIsEdit(target.name);
                    break;
                }
            } 
        }
    }

    // 篩選資料
    const filterData = (event) => {   
        if(event.target.name === 'SetFilterButton') {             // 設定條件篩選
            setFilteredData(statusData.filter(row => {
                if(filterConditions.region === '' || (filterConditions.region.split(';').includes(row.region))) 
                    if(filterConditions.prod_line === '' || (filterConditions.prod_line.split(';').includes(row.prod_line))) 
                        if(filterConditions.nc_id === '' || (filterConditions.nc_id.split(';').includes(row.nc_id))) 
                            if(filterConditions.station === '' || (filterConditions.station.split(';').includes(row.station)))
                                return true;

                return false;
            }));
        } else if(event.target.name === 'CleanFilterButton') {    // 清除篩選
            setFilterConditions(initConditions);
            setFilteredData(statusData);
        }
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
        .then(({data, }) => {
            setStatusData(data);
            setFilteredData(data);
        }).catch(err => console.error(err));
    }, []);

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
            {<DataSearchSection showSection={showSection} onFilter={filterData}
                conditions={filterConditions} onCondChange={setFilterConditions} />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<SettingStatusSubTable data={filteredData} isEdit={isEdit} editedStatus={editedStatus}
                    onTriggerEdit={handleTriggerEdit} setEditedStatus={setEditedStatus} />}
            </Box>
        </Stack>
    );
}

const initConditions = {
    region: '', 
    prod_line: '', 
    nc_id: '', 
    station: '',
}

function DataSearchSection({ showSection, onFilter, conditions, onCondChange }) {
    const handleChange = ({target, }) => {
        onCondChange(prevCond => ({
            ...prevCond,
            [target.name]: target.value,
        }))
    }
    
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
                        <TextField label='機台廠區' name='region' 
                            value={conditions.region} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台產線' name='prod_line' 
                            value={conditions.prod_line} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField label='機台工作站' name='station' 
                            value={conditions.station} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='機台名稱' name='nc_id' 
                            value={conditions.nc_id} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" name='SetFilterButton' onClick={onFilter}
                                sx={{bgcolor: '#027dbc' }}>
                                查詢</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" name='CleanFilterButton' onClick={onFilter}
                                sx={{bgcolor: '#70b9dc', color: 'black' }}>
                                清除篩選</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}