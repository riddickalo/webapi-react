import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, FilterAltRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import Table_NCStatus from "../components/Table_NCStatus";

export default function NC_Status() {
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
            <DataFilterSection showSection={showSection} />
            <Box className="layoutContent" mt={1} mb={3} width={'100%'}>
                {/* <p>機台狀態頁面</p> */}
                <Table_NCStatus />
            </Box>
        </Stack>
    );
}
