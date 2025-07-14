import { useState } from "react";
import { Collapse, Grid, Box, TextField, Button, FormControlLabel, Checkbox, InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import SetPermissionsSubPanel from "./Panel_SetPermissions";

export default function AddUserSection({ showSection, onUserAdded }) {
    const [newUser, setNewUser] = useState({
        user_name: '',
        user_alias: '',
        enable: true,
        permissions: {
            Sys_Notification: 'none',
            NC_Maintain: 'none',
            Report: 'none',
            Setting_Maintain: 'none',
            Setting_NCstatus: 'none',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // 新增使用者會套用預設密碼，新使用者登入後變更密碼
    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const selectChange = (name, value) => {
        setNewUser(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    const handleChange = ({ target }) => selectChange(target.name, target.value);
    const handleEnableChange = ({ target }) => selectChange(target.name, target.checked);

    const handleSubmmit = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            
            // 準備要發送的使用者資料
            const userData = {
                user_name: newUser.user_name,
                user_alias: newUser.user_alias,
                enable: newUser.enable ? 1 : 0,
                permissions: newUser.permissions
            };
            
            console.log('Creating new user:', userData);
            
            const response = await axios.post(
                process.env.REACT_APP_API_URL + '/auth/create-user', 
                {edit_info: userData},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log('User created successfully:', response.data);
            
            // 清空表單
            setNewUser({
                user_name: '',
                user_alias: '',
                enable: true,
                permissions: {
                    Sys_Notification: 'none',
                    NC_Maintain: 'none',
                    Report: 'none',
                    Setting_Maintain: 'none',
                    Setting_NCstatus: 'none',
                },
            });
            
            // 通知父組件使用者已新增（如果有提供回調函數）
            if (onUserAdded) {
                onUserAdded(response.data);
            }
            
            alert('使用者新增成功！');
            
        } catch (error) {
            console.error('Create user failed:', error);
            
            let errorMessage = '新增使用者失敗，請稍後再試。';
            if (error.response?.status === 400) {
                errorMessage = '輸入資料有誤，請檢查後重新提交。';
            } else if (error.response?.status === 401) {
                errorMessage = '認證失敗，請重新登入。';
            } else if (error.response?.status === 409) {
                errorMessage = '使用者帳號已存在，請使用其他帳號。';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

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
                        <TextField label='使用者帳號' name='user_name' value={newUser.user_name}
                            fullWidth
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField label='使用者暱稱' name='user_alias' value={newUser.user_alias}
                            fullWidth
                            onChange={handleChange} />
                    </Grid>
                    {/* <Grid item xs={12}> 
                        <TextField label='使用者密碼' name='user_password' value={newUser.user_password}
                            fullWidth
                            type={ showPassword ? 'text' : 'password' }
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge={'end'} sx={{ p: 0, mr: 1 }}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                    <Grid item xs={12}> 
                        <TextField label='確認密碼' name='confirm_password' value={newUser.confirm_password}
                            fullWidth
                            type={ showConfirmPassword ? 'text' : 'password' }
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge={'end'} sx={{ p: 0, mr: 1 }}>
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid> */}
                    <Grid item xs={12} align={'left'} ml={4}>
                        <FormControlLabel control={<Checkbox />} 
                            label='啟用使用者: ' name='enable' checked={newUser.enable} onChange={handleEnableChange}
                            labelPlacement="start" sx={{ color: '#030303' }} />
                    </Grid>
                    
                    {/* 新增權限設定面板 */}
                    <Grid item xs={12}>
                        <SetPermissionsSubPanel 
                            permissions={newUser.permissions}
                            onChange={selectChange}
                            limitedKeys={['Sys_Notification', 'NC_Maintain', 'Report', 'Setting_Maintain', 'Setting_NCstatus']}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button variant="contained" name='SubmmitButton' onClick={handleSubmmit}
                                disabled={!newUser.user_name || !newUser.user_alias || isSubmitting}
                                sx={{ bgcolor: '#20B2AA', ':hover': { bgcolor: '#1c9c95' } }}>
                                {isSubmitting ? '新增中...' : '新增'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}