import React, { useState } from "react";
import { Popover, Button, Stack } from "@mui/material";
import { LogoutRounded, KeyRounded, AccountBoxRounded  } from "@mui/icons-material";

export default function Popover_Logout() {
    const login_ID = 'Admin';
    const [isLogOutPop, setIsLogOutPop] = useState(null);
    
    const showLogOutPop = (event)=> {
        setIsLogOutPop(event.currentTarget);
    };

    const handleClose = () => {
        setIsLogOutPop(null);
    };

    const pop = Boolean(isLogOutPop);
    // const id = pop? 'logout-popover': undefined;

    return (
        <div>
            <Button className="login-button" 
                    size="large"
                    onClick={showLogOutPop}
                    startIcon={<AccountBoxRounded />}
                    sx={{ fontSize: 18, textTransform: 'none' }} >
                    {login_ID}
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
                        startIcon={<KeyRounded />}>
                        變更密碼
                    </Button>
                    <Button 
                        size="large"
                        sx={{ fontSize: '18px', color: '#606060' }}
                        startIcon={<LogoutRounded />}>
                        登出
                    </Button>
                </Stack>
            </Popover>
        </div>
    );
}
