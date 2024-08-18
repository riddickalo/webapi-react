import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FilterAltRounded, FileDownloadRounded, FileUploadRounded } from '@mui/icons-material';
import DataFilterSection from "../components/Data_Filter";
import Table_NCFile from "../components/Table_NCFile";

export default function NC_File() {
    const [showSection, setShowSection] = useState(true);

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
                    加工程式
                </Typography>
                <Button className="icon-filter" 
                    variant="text" 
                    onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FilterAltRounded sx={{ mr: '3px' }} />} > 
                    資料篩選
                </Button>
                <Button className="icon-upload" 
                    variant="text" 
                    // onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FileUploadRounded sx={{ mr: '3px' }} />} > 
                    上傳加工程式
                </Button>
                <Button className="icon-download" 
                    variant="text" 
                    // onClick={ toggleSection }
                    sx={{ fontSize: '20px', color: 'white' }}
                    startIcon={<FileDownloadRounded sx={{ mr: '3px' }} />} > 
                    下載加工程式
                </Button>
            </Stack>
            {/* <DataSearchSection showSection={showSection} /> */}
            <Box className="layoutContent" mt={2}>
                <Table_NCFile />
            </Box>
        </Stack>
    );
}
