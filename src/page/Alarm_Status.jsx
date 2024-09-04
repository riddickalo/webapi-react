import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import Table_AlarmStatus from "../components/Table_Alarm";

export default function Alarm_Status() {
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
                <Table_AlarmStatus />
            </Box>
        </Stack>
    );
}