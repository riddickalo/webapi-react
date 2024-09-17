import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, NoteAddRounded } from '@mui/icons-material';
import { MaintainFilterSection, MaintainAddSection} from "../components/Section_Maintain";
import SettingMaintainSubTable from "../components/Table_SettingMaintain";

export default function Setting_Maintain() {
    const [maintainData, setMaintainData] = useState(initialMaintainData);
    const [showSection, setShowSection] = useState('filter');
    const [sectionState, setSectionState] = useState(initialSectionState);

    const toggleSection = (sectionName) => {
        setShowSection(showSection === sectionName? null: sectionName);
    };

    const handleSectionChange = (name, value) => {
        setSectionState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    const handleClick = ({target}) => {
        console.log(sectionState)
        if(target.name === 'SetFilterButton') {
            console.log('filter')
            let NcId;
            if(sectionState.nc_id === null) NcId = 'all';
            else NcId = sectionState.nc_id;

            axios.get(process.env.REACT_APP_API_URL + `/api/maintain/${NcId}`)
                .then(({data, }) => {
                    console.log(data)
                    setMaintainData(data);
                }).catch((err) => console.error(err));

        } else if(target.name === 'SubmmitButton') {
            console.log('submit')
            axios.post(process.env.REACT_APP_API_URL + '/api/maintain', sectionState)
                .then(({data, }) => {
                    console.log(data)
                    setMaintainData(data);
                }).catch((err) => console.error(err));
        }
        
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/maintain/all')
            .then(({data, }) => {
                if(data !== null)
                    console.log(data)
                    setMaintainData(data);
            }).catch((err) => console.error(err));
    }, []);

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    機台保養項目
                </Typography>
                <Button className="icon-search" 
                    variant="text" 
                    onClick={ () => toggleSection('filter') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
                <Button className="icon-add" 
                    variant="text" 
                    onClick={ () => toggleSection('add') }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<NoteAddRounded sx={{ mr: '3px' }} />} > 
                    新增保養項目
                </Button>
            </Stack>
            {<MaintainFilterSection showSection={showSection} selectedNc={sectionState} 
                selectChange={handleSectionChange} handleSetFilter={handleClick} />}
            {<MaintainAddSection showSection={showSection} newItem={sectionState} 
                selectChange={handleSectionChange} handleSubmmit={handleClick} />}
            <Box className="layoutContent" mt={2} mb={3}>
                {<SettingMaintainSubTable data={maintainData.status} />}
            </Box>
        </Stack>
    );
}

const initialMaintainData = { status: [], records: [] };
const initialSectionState = { nc_id: null, item: null, period: null, enable: true };