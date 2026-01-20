import { Fragment, useState } from "react";
import axios from "axios";
// import { UserContext } from "../../shared/contexts/User_Provider";
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePswdDialog({ openDialog, setOpenDialog, onPasswordChange }) {
    // const { userInfo, setUserInfo } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
    const [chgData, setChgData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setChgData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        // 檢查新密碼和確認密碼是否相同
        if (chgData.new_password !== chgData.confirm_password) {
            onPasswordChange?.(false, '新密碼和確認密碼不一致，請重新輸入。');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting to change password with:', chgData);
            await axios.post(process.env.REACT_APP_API_URL + '/auth/change-password', chgData, {
                headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            
            // 清空輸入欄位（只在成功時清空）
            setChgData({
                current_password: '',
                new_password: '',
                confirm_password: ''
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
            new_password: '',
            confirm_password: ''
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
                                type={showPassword.current ? 'text' : 'password'}
                                fullWidth
                                value={chgData.current_password}
                                onChange={(e) => handleInputChange('current_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                                                edge="end"
                                            >
                                                {showPassword.current ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="New Password"
                                variant='outlined'
                                type={showPassword.new ? 'text' : 'password'}
                                fullWidth
                                value={chgData.new_password}
                                onChange={(e) => handleInputChange('new_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                                                edge="end"
                                            >
                                                {showPassword.new ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                            <TextField
                                label="Confirm Password"
                                variant='outlined'
                                type={showPassword.confirm ? 'text' : 'password'}
                                fullWidth
                                value={chgData.confirm_password}
                                onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                                                edge="end"
                                            >
                                                {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
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
                                disabled={isLoading || !chgData.current_password || !chgData.new_password || !chgData.confirm_password}
                        >
                            變更
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}