import React from "react";
import { Grid, TextField, MenuItem, Box, Button, Card, CardContent, Divider, IconButton, Stack, Typography } from "@mui/material";
import { SaveRounded } from '@mui/icons-material';

const lgOpts = [
    { code: 0, key: 'tw', value: '繁體中文' },
    { code: 1, key: 'en', value: 'English' },
];

export default function Sys_General() {
    return (
        <Stack direction='column' mx='5%' 
            Spacing={2}
            divider={<Divider orientation="horizontal" flexItem 
            sx={{ bgcolor: 'white', marginTop: 2 }} />}>
            <Stack className="layoutHead" 
                direction="column" 
                spacing='15px'
                mt='30px' >
                
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'} textAlign={'left'} >
                    一般設定
                </Typography>

                <Grid container spacing={1} width='100%'
                        sx={{ alignItems: 'center', bgcolor: '#bfb3f4', borderRadius: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" textAlign={'left'}>使用介面</Typography>
                    </Grid>
                    <Grid item xs={2} ml={1}> 
                        <Typography variant="h6">系統語系: </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField select label='選擇語系' align='left' sx={{ width: '100%', marginBottom: 1 }}>
                            {lgOpts.map((choice) => (     // should be '(' not'{'
                                <MenuItem key={choice.code} value={choice.key} >
                                    {choice.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Button 
                    variant="contained" startIcon={<SaveRounded />}
                    sx={{ bgcolor: '#20B2AA', width: '100%', marginBottom: 3, ':hover': { bgcolor: '#1c9c95' } }}>
                    儲存設定
                </Button>
            </Stack>

            <Stack className="layouContent" direction='row' spacing={2} mt={2} mb={3} alignItems='center'>
                <Typography variant="h4" fontWeight={'bold'} mt={'30px'}>
                    系統版本
                </Typography>
                <Card sx={{ width: 55, height: 25, bgcolor: "#E56717", alignContent:'center'}}>
                    <Typography variant="body2" sx={{ color: 'white' }}> v0.1.0 </Typography>
                </Card>
            </Stack>
        </Stack>
    );
}