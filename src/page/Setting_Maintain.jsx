import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FindInPageRounded, NoteAddRounded } from '@mui/icons-material';
import { MaintainFilterSection, MaintainAddSection} from "../components/Section_Maintain";
import SettingMaintainSubTable from "../components/Table_SettingMaintain";
import DeleteItemDialog from "../components/Dialog_DeleteMaintain";

export default function Setting_Maintain() {
    const [maintainData, setMaintainData] = useState(initialMaintainData);
    const [showSection, setShowSection] = useState('filter');
    const [sectionState, setSectionState] = useState(initialSectionState);
    const [isEdit, setIsEdit] = useState(null);
    const [editItem, setEditItem] = useState(initialSectionState);
    const [openDialog, setOpenDialog] = useState(false);
    // show or change sections
    const toggleSection = (sectionName) => {
        setShowSection(showSection === sectionName? null: sectionName);
    };
    const handleSectionChange = (name, value) => {
        setSectionState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    // onClick event for button on sections
    const handleSectionClick = ({target}) => {
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
            axios.post(process.env.REACT_APP_API_URL + '/api/maintain/update-item', sectionState)
                .then(({data, }) => {
                    console.log(data)
                    setMaintainData(data);
                }).catch((err) => console.error(err));
        }
    };

    // handle editItem change, editButton click
    const handleEditItemChange = (name, value) => {
        setEditItem(prevItem => ({
            ...prevItem,
            [name]: value,
        }));
    };
    const handleEditTrigger = ({target}) => {
        console.log(target.name)
        const action = target.name.split('-');
        console.log(action);
        if(action[0] === 'Edit') {
            const tg = Number(action[1])
            setIsEdit(tg); 
            // console.log(maintainData.status.filter(row => row.sn === tg));
            setEditItem(maintainData.items.filter(row => row.sn === tg)[0]);      
        } else if(action[0] === 'Save') {
            axios.post(process.env.REACT_APP_API_URL + '/api/maintain/update-item', editItem)
                .then(({data,}) => {
                    setMaintainData(data);
                    setIsEdit(null);
                    setEditItem(initialSectionState);
                });
        } else if(action[0] === 'Del') {
            setOpenDialog(true);
        }
    }
    // close delete alert dialog
    const handleDialogClose = () => {
        const simuEvent = {
            target: { name: 'SetFilterButton' }
        };
        handleSectionClick(simuEvent);
        setOpenDialog(false);
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
        <div>
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
                    selectChange={handleSectionChange} handleSetFilter={handleSectionClick} />}
                {<MaintainAddSection showSection={showSection} newItem={sectionState} 
                    selectChange={handleSectionChange} handleSubmmit={handleSectionClick} />}
                <Box className="layoutContent" mt={2} mb={3}>
                    {<SettingMaintainSubTable data={maintainData.items} isEdit={isEdit} editItem={editItem}
                        handleChange={handleEditItemChange} handleTrigger={handleEditTrigger}  />}
                </Box>
            </Stack>
            <DeleteItemDialog itemContent={editItem} openDialog={openDialog} handleClose={handleDialogClose} />
        </div>
    );
}

export const initialMaintainData = { items: [], records: [] };
export const initialSectionState = { 
    sn: null,
    nc_id: null, item: null, 
    period: null, enable: true,
    scheduled_check_time: null,
    last_check_time: null, 
};