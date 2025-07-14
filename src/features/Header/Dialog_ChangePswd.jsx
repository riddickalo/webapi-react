import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePswdDialog({ openDialog, setOpenDialog, onPasswordChange }) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [chgData, setChgData] = useState({
        current_password: '',
        new_password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setChgData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log('Attempting to change password with:', chgData);
            const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/change-password', chgData, {
                headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            
            // 清空輸入欄位（只在成功時清空）
            setChgData({
                current_password: '',
                new_password: ''
            });
            
            // 通知父組件變更密碼成功
            onPasswordChange?.(true, '變更密碼成功，請重新登入');
            
        } catch (error) {
            console.error('Password change failed:', error);
            
            // 變更密碼失敗時不清空輸入欄位，讓用戶可以重新嘗試
            // 根據錯誤狀態提供更具體的錯誤訊息
            let errorMessage = '密碼變更失敗，請重新嘗試。';
            if (error.response?.status === 401) {
                errorMessage = '目前密碼錯誤，請重新輸入。';
            } else if (error.response?.status === 403) {
                errorMessage = '沒有權限變更密碼。';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            // 通知父組件變更密碼失敗
            onPasswordChange?.(false, errorMessage);
            
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setChgData({
            current_password: '',
            new_password: ''
        })
    };

    return (
        <Fragment>
            <Dialog open={openDialog} onClose={handleClose}
                aria-labelledby="test-notify-dialog-title" 
                PaperProps={{ sx: { bgcolor: '#dff1fb' } }}>
                    <DialogTitle id="change-password-dialog-title" aria-describedby="test-notify-dialog-description" sx={{ fontWeight: 'bold' }}>
                        {'Change Password'}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ minWidth: 300, mt: 2}}>
                            <TextField
                                label="Current Password"
                                variant='outlined'
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={chgData.current_password}
                                onChange={(e) => handleInputChange('current_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="New Password"
                                variant='outlined'
                                type={showNewPassword ? 'text' : 'password'}
                                fullWidth
                                value={chgData.new_password}
                                onChange={(e) => handleInputChange('new_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                edge="end"
                                            >
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} disabled={isLoading}>
                            取消
                        </Button>
                        <Button onClick={handleSubmit}
                                variant="contained"
                                disabled={isLoading || !chgData.current_password || !chgData.new_password}
                        >
                            變更
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}