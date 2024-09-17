import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import NCStatusSubTable from "../components/Table_NCStatus";

const initConditions = {
    region: '', 
    prod_line: '', 
    nc_id: '', 
    opStatus: '',
}

export default function NC_Status() {
    const [showSection, setShowSection] = useState(true);
    const [statusData, setStatusData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [filterConditions, setFilterConditions] = useState(initConditions);

    const toggleSection = () => setShowSection(!showSection);

    // 篩選資料
    const filterData = (event) => {   
        if(event.target.name === 'SetFilterButton') {             // 設定條件篩選
            setFilteredData(statusData.filter(row => {
                if(filterConditions.region === '' || (filterConditions.region.split(';').includes(row.region))) 
                    if(filterConditions.prod_line === '' || (filterConditions.prod_line.split(';').includes(row.prod_line))) 
                        if(filterConditions.nc_id === '' || (filterConditions.nc_id.split(';').includes(row.nc_id))) 
                            if(filterConditions.opStatus === '' || filterConditions.opStatus === 'all' || (row.opStatus === filterConditions.opStatus))
                                return true;

                return false;
            }));
        } else if(event.target.name === 'CleanFilterButton') {    // 清除篩選
            setFilterConditions(initConditions);
            setFilteredData(statusData);
        }
    };

    useEffect(() => {
        // setStatusData(demoData);
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                // console.log(data);
                setStatusData(data);
                setFilteredData(data);
            }).catch((err) => console.error(err));
    }, []);

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    機台狀態
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
            </Stack>
            <DataFilterSection showSection={showSection} onFilter={filterData}
                conditions={filterConditions} onCondChange={setFilterConditions} />
            <Box className="layoutContent" mt={1} mb={3} width={'100%'}>
                <NCStatusSubTable statusData={filteredData} />
            </Box>
        </Stack>
    );
}
