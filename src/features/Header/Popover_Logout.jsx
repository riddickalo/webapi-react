import React, { useState, useContext } from "react";
import { UserContext } from "../../shared/contexts/User_Provider";
import { Popover, Button, Stack } from "@mui/material";
import { LogoutRounded, KeyRounded, AccountBoxRounded  } from "@mui/icons-material";
import { useLogout } from "../../shared/utils/logout";
import ChangePswdDialog from "./Dialog_ChangePswd";

export default function LogoutPopover({ isLogOutPop, setIsLogOutPop, onLogout, onPasswordChange }) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [openDialog, setOpenDialog] = useState(false);

    const showLogOutPop = (event) => setIsLogOutPop(event.currentTarget);
    const handleClose = () => setIsLogOutPop(null);
    const logout = useLogout();

    const handleLogout = () => {
        handleClose();                      // 關閉 Popover
        logout();                          // 執行登出操作
        onLogout?.('登出成功');              // 通知父組件登出成功
    }

    const pop = Boolean(isLogOutPop);
    // const id = pop? 'logout-popover': undefined;

    return (
        <div>
            <Button className="header-logout-button" 
                    size="large"
                    onClick={showLogOutPop}
                    startIcon={<AccountBoxRounded />}
                    sx={{ fontSize: 18, textTransform: 'none' }} >
                    {userInfo.user_name}
            </Button>
            <Popover 
                id='logoutPop'
                open={pop}
                anchorEl={isLogOutPop}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}} >
                <Stack direction='column' mx={2} my={1}>
                    <Button 
                        size="large"
                        sx={{ fontSize: '18px', color: '#606060' }}
                        onClick={() => setOpenDialog(true)}
                        startIcon={<KeyRounded />}>
                        變更密碼
                    </Button>
                    <Button 
                        size="large"
                        sx={{ fontSize: '18px', color: '#606060' }}
                        onClick={handleLogout}
                        startIcon={<LogoutRounded />}>
                        登出
                    </Button>
                </Stack>
            </Popover>
            <ChangePswdDialog openDialog={openDialog} 
                              setOpenDialog={setOpenDialog}
                              onPasswordChange={onPasswordChange} />
        </div>
    );
}
