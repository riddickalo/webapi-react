import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography, Collapse, Grid, TextField } from "@mui/material";
import { FilterAltRounded } from '@mui/icons-material';
import NcMaintainSubTable from "../components/Table_NCMaintain";
import { MaintainFilterSection } from "../components/Section_Maintain";
import { initialMaintainData, initialSectionState } from "./Setting_Maintain";
import CheckItemDialog from "../components/Dialog_CheckMaintain";
import axios from "axios";

export default function NC_Maintain() {
    const [showSection, setShowSection] = useState('filter');
    const [maintainData, setMaintainData] = useState(initialMaintainData);
    const [selectedNc, setSelectedNc] = useState({ nc_id: null });
    const [isEdit, setIsEdit] = useState(null);
    const [editItem, setEditItem] = useState(initialSectionState);
    const [openDialog, setOpenDialog] = useState(false);
    // show or change sections
    const toggleSection = () => {
        if(showSection) setShowSection(null);
        else setShowSection('filter');
    };
    const handleSelectChange = (name, value) => setSelectedNc(() => ({[name]: value}));
    
    // handle filter button
    const handleSetFilter = () => {
        const NcId = (selectedNc.nc_id === null)? 'all': selectedNc.nc_id;
        axios.get(process.env.REACT_APP_API_URL + `/api/maintain/${NcId}`)
            .then(({data, }) => {
                setMaintainData(data);
            }).catch((err) => console.error(err));
    };

    //handle button click in subtable
    const handleClick = ({target}) => {
        const action = target.name.split('-');
        console.log(action);

        if(action[0] === 'Edit') {
            const tg = Number(action[1]);
            setIsEdit(tg);
            setEditItem(maintainData.items.filter(row => (row.sn === tg))[0]);
        } else if(action[0] === 'Back') {
            setIsEdit(null);
            setEditItem(initialSectionState);
        } else if(action[0] === 'Check') {
            if(editItem.enable) {
                axios.post(process.env.REACT_APP_API_URL + '/api/maintain/create-record', editItem)
                    .then(({data, }) => {
                        console.log(data);
                        setOpenDialog(true);
                    }).catch((err) => console.error(err));
            } else {
                setOpenDialog(true);
            }
            setIsEdit(null);
            setEditItem(initialSectionState);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        handleSetFilter();
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/maintain/all')
            .then(({data, }) => {
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
                <MaintainFilterSection showSection={showSection} selectedNc={selectedNc}
                    selectChange={handleSelectChange} handleSetFilter={handleSetFilter} />
                <Box className="layoutContent" mt={2}>
                    <NcMaintainSubTable maintainData={maintainData} isEdit={isEdit} editItem={editItem} 
                        handleClick={handleClick} />
                </Box>
            </Stack>
            <CheckItemDialog itemContent={editItem} openDialog={openDialog} handleClose={handleDialogClose} />
        </div>
    );
}
