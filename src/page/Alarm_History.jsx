import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";
import { AlarmSubTable } from "../components/Table_Alarm";
import axios from "axios";

export default function Alarm_History() {
    const [showSection, setShowSection] = useState(true);
    const [alarmData, setAlarmData] = useState([]);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/alarm/history')
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
                    歷史警報
                </Typography>
                {/* <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button> */}
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={1} mb={3}>
                {/* <p>歷史警報頁面</p> */}
                <AlarmSubTable data={alarmData} />
            </Box>
        </Stack>
    );
}
