import React, { useState, useEffect, useRef, useContext } from "react";
import { Tabs, Tab, Box, Stack, Typography } from "@mui/material";
import LinePanel from "./NotifyPanel_Line";
import EmailPanel from "./NotifyPanel_Email";
import CheckNotifyDialog from "./Dialog_TestNotify";
import axios from "axios";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { UserContext } from "../../shared/contexts/User_Provider";
import NoPermission from "../../shared/components/NoPermission";
import AlertSnackbar from "../../shared/components/SnackBar_Alert";

dayjs.extend(objectSupport);

const str2dayjs = (str) => {
    if(str) {
        const strArr = str.split(':');
        return dayjs({ hour: strArr[0], minute: strArr[1] });
    } else return null;
};

export default function Sys_Notification() {
    const [value, setValue] = useState(0);
    const [settingStatus, setSettingStatus] = useState(initStatus);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const testResult = useRef(null);
    const dailyTime = useRef(null);

    const { userInfo } = useContext(UserContext);
    const permission = userInfo?.permissions?.Sys_Notification;
    const hasPermission = permission === 'edit' || permission === 'view';

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
    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        
        // convert dayjs object to string
        const sentSetting = {
            ...settingStatus,
            ['line_daily_time']: dayjs(dailyTime.current).format('HH:mm'),
        }
        axios.post(process.env.REACT_APP_API_URL + '/api/sys', sentSetting, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((ret) => {
                // console.info(ret);
                // convert string to dayjs object
                dailyTime.current = str2dayjs(ret.data.line_daily_time);
                setSettingStatus(ret.data);
                console.info('new settings effected.'); 
            }).catch(err => console.error(err));
    };

    // 測試訊息按鍵
    const handleSendTest = ({target}) => {
        const type = target.name.split('-');
        
        axios.get(process.env.REACT_APP_API_URL + `/api/test-notify/${type[0]}`)
            .then(() => {
                testResult.current = true;
                setOpenSnackbar(true);
            }).catch(() => {
                testResult.current = false;
                setOpenSnackbar(true);
            });     
    };

    // 取得顯示訊息
    const getTestResMsg = () => {
        if(testResult.current) return '';
        return testResult.current ? '請確認Line群組訊息' : '請確認是否設定正確Token，或邀請Line Notify至正確群組！';
    }

    // page mounting event
    useEffect(() => {
        if(!hasPermission) return;
        
        axios.get(process.env.REACT_APP_API_URL + '/api/sys').then((ret) => {
            dailyTime.current = str2dayjs(ret.data.line_daily_time);
            setSettingStatus(ret.data);
            // console.log(ret.data);
        }).catch(err => console.error(err));
    }, [hasPermission]);
    // handle timepicker change, set line_daily_time
    useEffect(() => {
        if(!dailyTime.current) return;
        setSettingStatus(prevSetting => ({
            ...prevSetting,
            ['line_daily_time']: dayjs(dailyTime).format('HH:mm'),
        }));
    }, [dailyTime]);

    if(!hasPermission) {
        return (<NoPermission />);
    }

    return (
        <div>
            <Stack direction='column' mx='5%' Spacing={2}>
                <Stack className="layoutHead" 
                    direction="column" 
                    spacing='15px'
                    mt='30px' >
                    
                    <Typography variant="h4" fontWeight={'bold'} mt={'30px'} textAlign={'left'} >
                        通知設定
                    </Typography>
                </Stack>

                <Stack className="layouContent" direction='row' spacing={2} mt={2} alignItems='center'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, BorderColor: 'divider', borderRadius: 2, backgroundColor: '#f0f0f0' }}>
                            <Tabs value={value} onChange={handlePanelChange} aria-label="ncMaintain tabs" centered variant="fullWidth">
                                <Tab label='Line' {...allyProps(0)} sx={{ fontSize: '18px', fontWeight: 'bold' }} />
                                {/* <Tab label='E-Mail' {...allyProps(1)} sx={{ fontSize: '18px', fontWeight: 'bold' }} /> */}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <LinePanel onSubmit={handleSubmit} onTest={handleSendTest} onChange={handleInputChange} 
                                status={settingStatus} dailyTime={dailyTime} />
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={1}>
                            <EmailPanel onSubmit={handleSubmit} onChange={handleInputChange} status={settingStatus} />
                        </CustomTabPanel> */}
                    </Box>
                </Stack>
            </Stack>
            <AlertSnackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} msg={getTestResMsg()} type={testResult.current? 'success':'fail'} />
            {/* <CheckNotifyDialog testResp={testResult} openDialog={openDialog} setOpenDialog={setOpenDialog} /> */}
        </div>
    );
}

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
    line_daily_status: false,
    line_daily_token: '',
    line_daily_time: '10:00',
    email_smtp: 'mail.jacktech.com.tw',
    email_port: '587',
    email_account: '',
    email_password: '',
    email_from: 'auto@jacktech.com.tw',
    email_alarm_status: false,
    email_alarm_to: '',
    email_alarm_cc: '',
    email_daily_status: false,
    email_daily_to: 'jack@jacktech.com.tw',
    email_daily_cc: '',
    email_daily_time: '10:00',
}
