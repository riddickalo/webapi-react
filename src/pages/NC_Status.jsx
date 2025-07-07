import React, { useState, useEffect, useRef } from "react";
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

export default function NC_Status(props) {
    const [showSection, setShowSection] = useState(true);
    const statusData = useRef(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filterConditions, setFilterConditions] = useState(initConditions);

    const toggleSection = () => setShowSection(!showSection);
    // 篩選資料
    const filterData = ({target}) => {   
        // let statusData = localStorage.getItem('statusData');
        // statusData = (statusData)? JSON.parse(statusData): {};
        if(target.name === 'SetFilterButton') {             // 設定條件篩選
            setFilteredData(statusData.current.filter(row => {
                if(filterConditions.region.length === 0 || (filterConditions.region.split(';').includes(row.region))) 
                    if(filterConditions.prod_line.length === 0 || (filterConditions.prod_line.split(';').includes(row.prod_line))) 
                        if(filterConditions.nc_id.length === 0 || (filterConditions.nc_id.split(';').includes(row.nc_id))) 
                            if(filterConditions.opStatus.length === 0 || filterConditions.opStatus === 'all' || row.opStatus === filterConditions.opStatus)
                                return true;

                return false;
            }));
        } else if(target.name === 'CleanFilterButton') {    // 清除篩選
            setFilterConditions(initConditions);
            setFilteredData(statusData.current);
        }
    };
    // get data from middle
    const fetchData = () => {
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                statusData.current = data;
            }).catch((err) => console.error(err));
    };

    // page mounting
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                setFilteredData(data);
                statusData.current = data;
            }).catch((err) => console.error(err));
    }, []);
     
    // Polling statusData
    useEffect(() => {
        const timerId = setInterval(fetchData, props.interval);
        return() => clearInterval(timerId);
    }, [props.interval]);
    
    // statusData update callback
    useEffect(() => {
        if(filteredData && statusData.current) {
            let ncList = [];
            filteredData.forEach(row => ncList.push(row.nc_id));
            setFilteredData(statusData.current.filter(row => (ncList.includes(row.nc_id))));
        } 
    }, [statusData.current]);

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
