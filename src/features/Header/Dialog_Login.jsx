import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Button, Stack, Dialog, DialogTitle, DialogActions, DialogContent, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginDialog({ openDialog, setOpenDialog, onLogin }) {
    const { setUserInfo } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({
        user_name: '',
        user_password: ''
    });
    // 控制登入API執行狀態
    const [isLoading, setIsLoading] = useState(false);
    
    // 控制輸入內容變化
    const handleInputChange = (name, value) => {
        setLoginData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    // 控制登入按鍵程序
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            console.log('Attempting to log in with:', loginData);
            const response = await axios.post(process.env.REACT_APP_API_URL + '/auth/login', loginData);
            
            // 更新 userInfo
            setUserInfo({
                user_name: response?.data.user_info.user_name,
                permissions: response?.data.user_info.permissions || {},
            });
            
            // 將 token 存入 localStorage
            if (response?.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            // 清空輸入欄位（只在成功時清空）
            setLoginData({
                user_name: '',
                user_password: ''
            });
            
            // 通知父元件登入成功
            onLogin?.(true, '登入成功');
            
        } catch (error) {
            console.error('Login failed:', error);
            
            // 登入失敗時不清空輸入欄位，讓用戶可以重新嘗試
            // 根據錯誤狀態提供更具體的錯誤訊息
            let errorMessage = '登入失敗，請檢查您的帳號或密碼。';
            if (error.response?.status === 401) {
                errorMessage = '帳號或密碼錯誤，請重新輸入。';
            } else if (error.response?.status === 403) {
                errorMessage = '帳號已被停用，請聯絡管理員。';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            // 通知父元件登入失敗
            onLogin?.(false, errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        // 清空輸入欄位
        setLoginData({
            user_name: '',
            user_password: ''
        });
    };
    // const handleTextChange = ({target, }) => onChange(target.name, target.value);

    return (
        <Fragment>
            <Dialog open={openDialog} onClose={handleClose}
                aria-labelledby="login-dialog-title" 
                PaperProps={{ sx: { bgcolor: '#dff1fb' } }}>
                    <DialogTitle id="login-dialog-title" sx={{ fontWeight: 'bold' }}>
                        {'LOGIN'}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ minWidth: 300, mt: 2 }}>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                fullWidth
                                value={loginData.user_name}
                                onChange={(e) => handleInputChange('user_name', e.target.value)}
                                disabled={isLoading}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={loginData.user_password}
                                onChange={(e) => handleInputChange('user_password', e.target.value)}
                                disabled={isLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge={'end'} sx={{ p: 0, mr: 1 }}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} disabled={isLoading}>
                            取消
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            variant="contained"
                            disabled={isLoading || !loginData.user_name || !loginData.user_password}
                        >
                            {/* 透過執行狀態卡住登入按鍵 */}
                            {isLoading ? 'Logging in...' : '登入'}
                        </Button>
                    </DialogActions>
            </Dialog>
        </Fragment>
    );
}