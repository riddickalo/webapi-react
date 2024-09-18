import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import { AlarmSubTable } from "../components/Table_Alarm";
import axios from "axios";

export default function Alarm_Status() {
    const [showSection, setShowSection] = useState(true);
    const [alarmData, setAlarmData] = useState([]);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/alarm/current')
            .then(({data, }) => {
                // console.log(data);
                setAlarmData(data);
            }).catch((err) => console.error(err));
    }, []);

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    即時警報
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
            </Stack>
            {/* <DataFilterSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={1} mb={3}>
                {/* <p>即時警報頁面</p> */}
                <AlarmSubTable data={alarmData} />
            </Box>
        </Stack>
    );
}