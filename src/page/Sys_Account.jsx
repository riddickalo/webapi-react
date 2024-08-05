import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PersonAddAltRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";

export default function Sys_Account() {
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
                    使用者管理
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<PersonAddAltRounded sx={{ mr: '3px' }} />} > 
                    新增帳號
                </Button>
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent">
                <p>使用者管理頁面</p>
            </Box>
        </Stack>
    );
}