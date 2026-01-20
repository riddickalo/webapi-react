import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Box, Button, Stack, Typography } from "@mui/material";
import { PersonAddAltRounded } from '@mui/icons-material';
import NoPermission from "../../shared/components/NoPermission";
import AddUserSection from "./Section_AddUser";
import AccountSubTable from "./Table_Account";
import AlertSnackbar from "../../shared/components/SnackBar_Alert";
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
    const [alertStatus, setAlertStatus] = useState({ open: false, message: '', severity: 'info' });

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
            setAlertStatus({
                open: true,
                message: '無法編輯系統管理員帳號',
                severity: 'error'
            });
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

    // 新增用戶後，關閉section
    const handleUserAdded = (newUser) => {
        setShowSection(false);
        obtainUserData();
        if(newUser) {
            setAlertStatus({
                open: true,
                message: '使用者新增成功！',
                severity: 'success'
            });
        }
    };

    // 獲取用戶數據
    const obtainUserData = async () => {
        if (!hasPermission) return;
        
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL + '/auth/user');
            // console.log('Fetched user data:', data);
            setUserData(data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setAlertStatus({
                open: true,
                message: '無法獲取使用者資料，請稍後再試。',
                severity: 'error'
            });
        }
    };

    // 加載用戶數據
    useEffect(() => {
        obtainUserData();

        // 模擬數據
        // setUserData(mockUserData);
    }, [hasPermission]);

    if (!hasPermission) {
        return (<NoPermission />);
    }

    return (
        <>
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
                <AddUserSection showSection={showSection} onUserAdded={handleUserAdded} />
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
            <AlertSnackbar  open={alertStatus.open}
                            onClose={() => setAlertStatus({ ...alertStatus, open: false })}
                            message={alertStatus.message}
                            severity={alertStatus.severity}
                            position={{ vertical: 'top', horizontal: 'center' }} />
        </>
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