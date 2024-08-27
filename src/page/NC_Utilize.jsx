import React, { useState } from "react";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { FindInPageRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";
import Card_Utilize from "../components/Card_Utilize";
import '../assets/css/NC_Utilize.css'

function createData(region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus) {
    return { region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus };
}

const demoData = [
    createData('總部', 'RG', '內溝研磨', 'GI-700-3', 'alarm', 'O999', true),
    createData('總部', 'RG', '平測磨', 'SG-500-1', 'idle', 'G100', false),
    createData('一廠', 'MG', '內溝研磨', 'GI-700-4', 'running', 'O991', true),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', 'running', 'Main.tch', false),
    createData('二廠', 'EG', '裝配', 'GI-700-3', 'idle', 'O999', false),
];

export default function NC_Utilize() {
    const [showSection, setShowSection] = useState(false);

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
                    機台稼動率
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
            </Stack>
            <DataSearchSection showSection={showSection} />
            <Box className="layoutContent" sx={{ height: '100%', my: 3}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card_Utilize data={demoData[0]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card_Utilize data={demoData[1]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card_Utilize data={demoData[2]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card_Utilize data={demoData[3]} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card_Utilize data={demoData[4]} />
                    </Grid>
                </Grid>
                    
            </Box>
        </Stack>
    );
}