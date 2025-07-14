import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PersonAddAltRounded } from '@mui/icons-material';
import NoPermission from "../../shared/components/NoPermission";
import AddUserSection from "./Section_AddUser";
import AccountSubTable from "./Table_Account";
import axios from "axios";

const initialUserState = {
    user_name: '',
    user_alias: '',
    permissions: {},
    status: true
};

export default function Sys_Account() {
    const [showSection, setShowSection] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isEdit, setIsEdit] = useState(null);
    const [editItem, setEditItem] = useState(initialUserState);

    const { userInfo } = useContext(UserContext);
    const permission = userInfo?.permissions?.Sys_Account;
    const isAdmin = userInfo?.user_name === 'admin';
    const hasPermission = (permission === 'edit' || permission === 'view') && isAdmin;

    const toggleSection = () => {
        setShowSection(!showSection);
    }

    // 處理編輯項目的變更
    const handleEditItemChange = (name, value) => {
        setEditItem(prevItem => ({
            ...prevItem,
            [name]: value,
        }));
    };

    // 處理表格按鈕點擊
    const handleClick = ({ target }) => {
        const action = target.name.split('-');
        const userId = action[1]; // 使用 user_name 作為 ID

        // 禁止編輯 admin 用戶
        if (userId === 'admin' && (action[0] === 'Edit' || action[0] === 'Save')) {
            alert('系統管理員帳號不允許被編輯');
            return;
        }

        if (action[0] === 'Edit' && hasPermission) {
            setIsEdit(userId);
            const user = userData.find(row => row.user_name === userId);
            if (user) {
                setEditItem({ ...user }); // 複製用戶對象以避免直接修改原始數據
            }
        } else if (action[0] === 'Save' && hasPermission) {
            console.log('Save user:', editItem);
            
            // 更新本地狀態（實際實現中會從 API 響應更新）
            setUserData(prevData => 
                prevData.map(user => 
                    user.user_name === userId ? { ...user, ...editItem } : user
                )
            );
            setIsEdit(null);
            setEditItem(initialUserState);
        } else if (action[0] === 'Cancel') {
            setIsEdit(null);
            setEditItem(initialUserState);
        }
    };

    // 加載用戶數據
    useEffect(() => {
        if (!hasPermission) return;
        
        // TODO: 實際從後端 API 獲取用戶數據
        axios.get(process.env.REACT_APP_API_URL + '/auth/user')
            .then(({ data }) => {
                console.log('Fetched user data:', data);
                setUserData(data);
            }).catch((err) => console.error(err));
        
        // 模擬數據
        // setUserData(mockUserData);
    }, [hasPermission]);

    if (!hasPermission) {
        return (<NoPermission />);
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
                    onClick={toggleSection}
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<PersonAddAltRounded sx={{ mr: '3px' }} />} > 
                    新增帳號
                </Button>
            </Stack>
            <AddUserSection showSection={showSection} />
            <Box className="layoutContent" mt={2} mb={5}>
                <AccountSubTable 
                    data={userData}
                    isEdit={isEdit}
                    editItem={editItem}
                    handleClick={handleClick}
                    handleChange={handleEditItemChange}
                    canEdit={hasPermission}
                />
            </Box>
        </Stack>
    );
}

const mockUserData = [
            {
                sn: 1,
                user_name: 'admin',
                user_alias: '系統管理員',
                last_login: '2024-01-15 10:30:00',
                status: true,
                permissions: {
                    Sys_Notification: 'edit',
                    NC_Maintain: 'edit',
                    Report: 'edit',
                    Setting_Maintain: 'edit',
                    Setting_NCstatus: 'edit'
                }
            },
            {
                sn: 2,
                user_name: 'operator',
                user_alias: '操作員',
                last_login: '2024-01-14 15:20:00',
                status: true,
                permissions: {
                    Sys_Notification: 'none',
                    NC_Maintain: 'view',
                    Report: 'view',
                    Setting_Maintain: 'none',
                    Setting_NCstatus: 'none'
                }
            },
            {
                sn: 3,
                user_name: 'viewer',
                user_alias: '觀察者',
                last_login: '2024-01-13 09:15:00',
                status: true,
                permissions: {
                    Sys_Notification: 'none',
                    NC_Maintain: 'view',
                    Report: 'view',
                    Setting_Maintain: 'none',
                    Setting_NCstatus: 'none'
                }
            }
        ];