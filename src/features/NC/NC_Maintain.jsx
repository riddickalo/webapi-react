import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FilterAltRounded } from '@mui/icons-material';
import NcMaintainSubTable from "./Table_NCMaintain";
import MaintainFilterSection from "./Section_FilterMaintain";
import { initialMaintainData, initialSectionState } from "../General-settings/Setting_Maintain";
import CheckItemDialog from "./Dialog_CheckMaintain";
import NoPermission from "../../shared/components/NoPermission";
import { UserContext } from "../../shared/contexts/User_Provider";
import { useLogout } from "../../shared/utils/logout";
import axios from "axios";

export default function NC_Maintain() {
    const { userInfo } = useContext(UserContext);
    const [showSection, setShowSection] = useState('filter');
    const [maintainData, setMaintainData] = useState(initialMaintainData);
    const [selectedNc, setSelectedNc] = useState({ nc_id: null });
    const [isEdit, setIsEdit] = useState(null);
    const [editItem, setEditItem] = useState(initialSectionState);
    const [openDialog, setOpenDialog] = useState(false);
    
    // 檢查權限
    const permission = userInfo?.permissions?.NC_Maintain;
    const hasPermission = permission === 'edit' || permission === 'view';
    const canEdit = permission === 'edit';

    const logout = useLogout();
    
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

    // handle button click in subtable
    const handleClick = ({target}) => {
        const action = target.name.split('-');
        console.log(action);

        if(action[0] === 'Edit' && canEdit) {
            const tg = Number(action[1]);
            setIsEdit(tg);
            setEditItem(maintainData.items.filter(row => (row.sn === tg))[0]);
        } else if(action[0] === 'Back') {
            setIsEdit(null);
            setEditItem(initialSectionState);
        } else if(action[0] === 'Check' && canEdit) {
            if(editItem.status > 0) {
                axios.post(process.env.REACT_APP_API_URL + '/api/maintain/create-record', editItem, {
                    headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
                }).then(({data, }) => {
                    console.log(data);
                    setOpenDialog(true);
                }).catch((err) => {
                    console.error(err)
                    if(err.response?.status === 401) {
                        logout();
                    }
                });
            } else {
                setOpenDialog(true);
            }
            setIsEdit(null);
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        handleSetFilter();
    };

    useEffect(() => {
        // 只有當有權限時才獲取資料
        if (hasPermission) {
            axios.get(process.env.REACT_APP_API_URL + '/api/maintain/all')
                .then(({data, }) => {
                    setMaintainData(data);
                }).catch((err) => console.error(err));
        }
    }, [hasPermission]);

    // 如果沒有權限，顯示無權限頁面
    if (!hasPermission) {
        return <NoPermission />;
    }

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
                        handleClick={handleClick} canEdit={canEdit} />
                </Box>
            </Stack>
            <CheckItemDialog itemContent={editItem} openDialog={openDialog} handleClose={handleDialogClose} />
        </div>
    );
}
