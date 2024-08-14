import React, { useState } from "react";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import { FindInPageRounded } from '@mui/icons-material';
import DataSearchSection from "../components/Data_Search";
import Card_Utilize from "../components/Card_Utilize";
import U_card1 from '../assets/img/u_icon1.png'
import U_card2 from '../assets/img/u_icon2.png'
import U_card3 from '../assets/img/u_icon3.png'
import '../assets/css/NC_Utilize.css'

export default function NC_Utilize() {
    const [showSection, setShowSection] = useState(false);

    const toggleSection = ()=>{
        setShowSection(!showSection);
    }

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
            <Box className="layoutContent" sx={{ height: '100%', my: 3}}>
                {/* <p>機台稼動率頁面</p> */}
                {/* <Card_Utilize /> */}
                <Grid container spacing={3}>
                    <Grid item sm={12}>
                        <img className="u-card" src={U_card1} />
                    </Grid>
                    <Grid item sm={6}>
                        <img className="u-card1" src={U_card2} />
                    </Grid>
                    <Grid item sm={6}>
                        <img className="u-card1" src={U_card3} />
                    </Grid>
                </Grid>
                    
            </Box>
        </Stack>
    );
}
