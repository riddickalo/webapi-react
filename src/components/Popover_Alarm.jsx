import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Popover, Button, Box } from "@mui/material";
import { SmsFailedRounded  } from "@mui/icons-material";

export default function Popover_Alarm() {
    const [isAlarmPop, setIsAlarmPop] = useState(null);
    
    const showAlarmPop = (event) => {   
        setIsAlarmPop(event.currentTarget);
    };

    const handleClose = () => {
        setIsAlarmPop(null);
    };

    const pop = Boolean(isAlarmPop);


    return (
        <div>
            <Button className="alarm-button" 
                size="large"
                onClick={showAlarmPop}
                startIcon={<SmsFailedRounded  />} >
            </Button>
            <Popover
                id='alarmPop'
                open={pop}
                anchorEl={isAlarmPop}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}} >
                <Box bgcolor={'#dddddd'} 
                    sx={{
                        '& .MuiButton: hover': { bgcolor: '#b6003b'}
                    }} >
                    <Button 
                        components='a' href='/alarm/status'
                        size="medium"
                        sx={{  
                            color: 'white', 
                            bgcolor: 'red',
                            mt: 40,
                            mb: 2,
                            mx: 10, }}>
                        查看即時警報
                    </Button>
                </Box>
            </Popover>
        </div>
    );
}
