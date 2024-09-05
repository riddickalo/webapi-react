import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Stack, Typography } from "@mui/material";
import LinePanel from "../components/NotifyPanel_Line";
import EmailPanel from "../components/NotifiPanel_Email";
import axios from "axios";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div 
            role='notifypanel'
            hidden={value !== index}
            id={`notifypanel-${index}`}
            aria-labelledby={`table-tab-${index}`}
            {...other} >
                {value === index && <Box sx={{ p: 3 }}> {children} </Box>}
        </div>
    );
}

function allyProps(index) {
    return {
        id: `table-tab-${index}`,
        'aria-controls': `notifypanel-${index}`,
    };
}

const initStatus = {
    line_alarm_status: true,
    line_alarm_token: '37v9RzV9SWv7pHEYHEkzzYGwmoeDeLDdn3Hw1iOQaj3',
    line_alarm_ln: 'en',
    line_alarm_timezone:'Taipei',
    line_date_status: false,
    line_date_token: '',
    line_date_time: '10:00',
    email_smtp: 'mail.jacktech.com.tw',
    email_port: '587',
    email_account: '',
    email_password: '',
    email_from: 'auto@jacktech.com.tw',
    email_alarm_status: false,
    email_alarm_to: '',
    email_alarm_cc: '',
    email_date_status: false,
    email_date_to: 'jack@jacktech.com.tw',
    email_date_cc: '',
    email_date_time: '10:00',
}

export default function Sys_Notification() {
    const [value, setValue] = useState(0);
    const [settingStatus, setSettingStatus] = useState(initStatus);
    // 控制Line和Email設定版面顯示切換
    const handlePanelChange = (event, newValue) => {
        setValue(newValue);
    };
    // 控制設定內容變化
    const handleInputChange = (name, value) => {
        setSettingStatus(prevStatus => ({
            ...prevStatus,
            [name]: value,
        }));
    };
    // 控制儲存按鍵程序
    const onSubmit = () => {
        axios.post(process.env.REACT_APP_API_URL + '/api/sys', settingStatus)
            .then((ret) => {
                console.info(ret);
                setSettingStatus(ret.data);
                console.info('new settings effected.'); 
            }).catch(err => console.error(err));
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/sys').then((ret) => {
            setSettingStatus(ret.data);
            console.log(ret.data)
        }).catch(err => console.error(err));
    }, []);

    return (
        <Stack direction='column' mx='5%' Spacing={2}>
            <Stack className="layoutHead" 
                direction="column" 
                spacing='15px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    通知設定
                </Typography>
            </Stack>

            <Stack className="layouContent" direction='row' spacing={2} mt={2} alignItems='center'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, BorderColor: 'divider', borderRadius: 2, backgroundColor: '#f0f0f0' }}>
                        <Tabs value={value} onChange={handlePanelChange} aria-label="ncMaintain tabs" centered variant="fullWidth">
                            <Tab label='Line' {...allyProps(0)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                            <Tab label='E-Mail' {...allyProps(1)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <LinePanel onSubmit={onSubmit} onChange={handleInputChange} status={settingStatus} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <EmailPanel onSubmit={onSubmit} onChange={handleInputChange} status={settingStatus} />
                    </CustomTabPanel>
                </Box>
            </Stack>
        </Stack>
    );
}