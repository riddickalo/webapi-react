import React, { useState } from "react";
import { Box, Button, Stack, Typography, Collapse, Grid, TextField } from "@mui/material";
import { FilterAltRounded } from '@mui/icons-material';
import Table_NcMaintain from "../components/Table_NCMaintain";

function filterSection({ showSection }) {
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
                    <Grid item xs={12}>
                        <TextField label='機台名稱' select />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"
                                sx={{bgcolor: '#027dbc' }}>
                                更新篩選</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default function NC_Maintain() {
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
                    機台保養
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
            </Stack>
            {filterSection({ showSection })}
            <Box className="layoutContent" mt={2}>
                <Table_NcMaintain />
            </Box>
        </Stack>
    );
}