import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReportSubTable from "../components/Table_Report";
import axios from 'axios';
import * as dayjs from 'dayjs';
import downloader from 'js-file-download';

export default function Report() {
    const [timeRange, setTimeRange] = useState({ startTime: null, endTime: null });

    const handleTriggerDownload = (e) => {
        console.info(e.target.name);
        try{
            const reportType = e.target.name.split('_');
            const rangeStart = timeRange.startTime.format('YYYY-MM-DD-HH-mm') + '-00';
            const rangeEnd = timeRange.endTime.format('YYYY-MM-DD-HH-mm') + '-00';
            if(reportType[0] === 'nc') {        // handle nc reports as zip
                axios.get(process.env.REACT_APP_API_URL + '/report', {
                    params: {
                        type: e.target.name,
                        startTime: rangeStart,
                        endTime: rangeEnd,
                    },
                    responseType: 'blob',
                }).then(resp => {
                    let fileName = `${e.target.name}_${rangeStart}_to_${rangeEnd}.xlsx`;
                    // let fileName = `${e.target.name}_${rangeStart}_to_${rangeEnd}.zip`;      // zip format has been deprecated
                    
                    // create a object handling from received data download to local
                    const url = window.URL.createObjectURL(new Blob([resp.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });

            } else {                            // handle item report as csv
                axios.get(process.env.REACT_APP_API_URL + '/report', {
                    params: {
                        type: e.target.name,
                        startTime: rangeStart,
                        endTime: rangeEnd,
                    }
                }).then(res => {
                    console.log(res);
                    downloader(res.data, `${e.target.name}_${rangeStart}_to_${rangeEnd}.csv`);
                })
            }
        } catch(err) { console.error(err) };
    }

    const handleChangeRange = (label, e) => {
        // console.log(timeRange.endTime.format('YYYYMMDD-HHmm') + '00');
        setTimeRange(prevRange => ({
            ...prevRange,
            [label]: e,
        }));
    }

    useEffect(() => {
        const ed = dayjs();
        const st = dayjs().month(ed.month() - 1);
        console.log(st, ed)
        setTimeRange({ startTime: st, endTime: ed, });
    }, []);

    // format="YYYY/MM/DD HH:mm", HH indicates 24h format, hh indicates 12h
    return (
        <Stack direction='column' mx='5%'>                
            <Typography variant="h4" fontWeight={'bold'} mt={'30px'} align="left">
                報表下載
            </Typography>
            <Box my={2} alignContent='center' alignItems='center'
                sx={{ 
                    bgcolor: '#e0e0e0',
                    border: '3px solid #5e75ae',
                    borderRadius: 2,
                    '& .MuiTextField-root': { width: "90%" },
                    '.p': { fontSize: '16px' }, }} >
                    <Grid container mt={1} mb={4} spacing={2} width='100%'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-TW">
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker 
                                    format="YYYY/MM/DD HH:mm"
                                    label='統計區間(起)' 
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    ampm={false}
                                    onChange={(e) => handleChangeRange('startTime', e)}
                                    value={timeRange.startTime} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker 
                                    format="YYYY/MM/DD HH:mm"
                                    label='統計區間 (迄)' 
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    ampm={false}                                    
                                    onChange={(e) => handleChangeRange('endTime', e)}
                                    value={timeRange.endTime} />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
            </Box>
            <Box className="layoutContent" mt={2} mb={3}>
                <ReportSubTable onDownload={handleTriggerDownload} />
            </Box>
        </Stack>
    );
}