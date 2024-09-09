import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { FindInPageRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";
import Card_Utilize from "../components/Card_Utilize";
import NoData from "../components/NoData";
import '../assets/css/NC_Utilize.css'
import axios from "axios";

function createData(region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus) {
    return { region, prod_line, station, nc_id, opStatus, ncfile, maintainStatus };
}

const demoData = [
    createData('總部', 'RG', '內溝研磨', 'GI-700-3', 'alarm', 'O999', true),
    createData('總部', 'RG', '平測磨', 'SG-500-1', 'idle', 'G100', false),
    createData('一廠', 'MG', '內溝研磨', 'GI-700-4', 'running', 'O991', true),
    createData('一廠', 'MG', '關節手臂', 'Fanuc M-800i', 'running', 'Main.tch', false),
    createData('二廠', 'EG', '裝配', 'GI-700-3', 'idle', 'O999', false),
];

export default function NC_Utilize() {
    const [showSection, setShowSection] = useState(false);
    const [utilizeData, setUtilizeData] = useState(null);
    const layoutRef = useRef(null);
    const [layoutWidth, setLayoutWidth] = useState(0);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

    const getGridColumns = () => {
        if(layoutWidth > 900) return 3;
        else if(layoutWidth > 600) return 2;
        else return 1;
    };

    useEffect(() => {
        // setUtilizeData(demoData);
        // get Data
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                // console.log(data);
                setUtilizeData(data);
            }).catch((err) => console.error(err));

        // observe parent component width
        // create a  listener
        const sizeObserver = new ResizeObserver((entries) => {
            if(entries[0]) {
                setLayoutWidth(entries[0].contentRect.width);
            }
        });

        // start listening if listener exists
        if(layoutRef.current) {
            sizeObserver.observe(layoutRef.current);
        }

        // clean listener
        return() => {
            if(sizeObserver.current) {
                sizeObserver.unobserve(layoutRef.current);
            }
        }
    }, []);

    return (
        <Stack direction='column' mx='5%'>
            <Stack className="layoutHead" 
                direction="row" 
                spacing='40px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    機台稼動率
                </Typography>
                <Button className="icon" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FindInPageRounded sx={{ mr: '3px' }} />} > 
                    進階搜尋
                </Button>
            </Stack>
            <DataSearchSection showSection={showSection} />
            <Box className="layoutContent" ref={layoutRef} sx={{ height: '100%', my: 3, display: 'flex' }}>
                <Grid container spacing={5} columns={getGridColumns()}>
                    {
                        utilizeData==null? <NoData mt={3} ml={5}/>:
                            utilizeData.map((row) => (
                                <Grid item xs={1} key={row.nc_id}>
                                    <Card_Utilize {...row} />
                                </Grid>
                            ))
                    }
                </Grid>
                    
            </Box>
        </Stack>
    );
}
