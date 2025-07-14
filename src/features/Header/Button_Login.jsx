import React, { useState, useContext } from "react";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Button } from "@mui/material";
import { AccountBoxRounded  } from "@mui/icons-material";
import LoginDialog from "./Dialog_Login";
import AlertSnackbar from "../../shared/components/SnackBar_Alert";
import LogoutPopover from "./Popover_Logout";

export default function LoginButton() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [isLogOutPop, setIsLogOutPop] = useState(null);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    // snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [snackbarType, setSnackbarType] = useState('info');

    // 接收登入結果，並執行對應的操作
    const handleLoginResult = (success, message) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarType(success ? 'success' : 'fail');
        if (success) {
            setOpenLoginDialog(false); // Close the dialog on successful login
        }
    };

    // 接收登出結果
    const handleLogoutResult = (message) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarType('info');
    };

    // 接收變更密碼結果
    const handlePasswordChangeResult = (success, message) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarType(success ? 'success' : 'fail');
        
        if (success) {
            // 密碼變更成功後自動登出
            setTimeout(() => {
                setUserInfo(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
            }, 2000); // 2秒後自動登出，讓用戶看到成功訊息
        }
        // 失敗時不關閉對話框，讓用戶重新嘗試
    };

    const isLogin = (user) => {
        if(!user) {
            return (
                <div>
                    <Button className="header-login-button" 
                            size="large"
                            onClick={() => setOpenLoginDialog(true)}
                            startIcon={<AccountBoxRounded />}
                            sx={{ fontSize: 18, textTransform: 'none' }} >
                            {'登入'}
                    </Button>
                    <LoginDialog openDialog={openLoginDialog} 
                                 setOpenDialog={setOpenLoginDialog}
                                 onLogin={handleLoginResult} />
                    <AlertSnackbar openSnackbar={snackbarOpen}
                                   setOpenSnackbar={setSnackbarOpen}
                                   msg={snackbarMessage}
                                   type={snackbarType}
                                   position={{ v: 'top', h: 'center' }} />
                </div>
            );
        } else {
            return (
                <div>
                    <LogoutPopover isLogOutPop={isLogOutPop} 
                                   setIsLogOutPop={setIsLogOutPop}
                                   onLogout={handleLogoutResult}
                                   onPasswordChange={handlePasswordChangeResult} />
                    <AlertSnackbar openSnackbar={snackbarOpen}
                                   setOpenSnackbar={setSnackbarOpen}
                                   msg={snackbarMessage}
                                   type={snackbarType}
                                   position={{ v: 'top', h: 'center' }} />
                </div>
            );
        }
    };

    return isLogin(userInfo?.user_name);
}