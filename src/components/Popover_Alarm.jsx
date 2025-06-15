import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { AlarmPopTable } from "./Table_Alarm";
import { Popover, Button, Box } from "@mui/material";
import { SmsFailedRounded  } from "@mui/icons-material";

export default function Popover_Alarm() {
    const [isAlarmPop, setIsAlarmPop] = useState(null);
    const [alarmData, setAlarmData] = useState([]);
    
    const showAlarmPop = (event) => {   
        setIsAlarmPop(event.currentTarget);
    };

    const handleClose = () => {
        setIsAlarmPop(null);
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/alarm/current')
            .then(({data, }) => {
                setAlarmData(data);
            }).catch((err) => console.error(err));
    }, [isAlarmPop]);

    const pop = Boolean(isAlarmPop);
    const base_name = process.env.REACT_APP_BASE_NAME || '';

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
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                sx={{ overflowY: 'auto' }} >
                <Box bgcolor={'#dddddd'} 
                    sx={{
                        '& .MuiButton: hover': { bgcolor: '#b6003b'}
                    }} >
                    <AlarmPopTable data={alarmData} />
                    <Button 
                        components='a' href={`${base_name}/alarm/status`}
                        size="medium"
                        sx={{  
                            color: 'white', bgcolor: 'red',
                            mt: (alarmData.length > 0)? 2: 40,
                            mb: 2, mx: 10, }}>
                        查看即時警報
                    </Button>
                </Box>
            </Popover>
        </div>
    );
}
