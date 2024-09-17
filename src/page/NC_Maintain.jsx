import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography, Collapse, Grid, TextField } from "@mui/material";
import { FilterAltRounded } from '@mui/icons-material';
import NcMaintainSubTable from "../components/Table_NCMaintain";
import { MaintainFilterSection } from "../components/Section_Maintain";
import axios from "axios";

export default function NC_Maintain() {
    const [showSection, setShowSection] = useState('filter');
    const [ncList, setNcList] = useState([]);
    const [selectedNc, setSelectedNc] = useState(null);

    const toggleSection = () => {
        if(showSection) setShowSection(null);
        else setShowSection('filter');
    };

    const handleSetFilter = () => {
        console.log(selectedNc);
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                setNcList(data);
            }).catch((err) => console.error(err));
    }, []);

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
            <MaintainFilterSection showSection={showSection} selectedNc={selectedNc} ncList={ncList}
                selectChange={setSelectedNc} handleSetFilter={handleSetFilter} />
            <Box className="layoutContent" mt={2}>
                <NcMaintainSubTable />
            </Box>
        </Stack>
    );
}
