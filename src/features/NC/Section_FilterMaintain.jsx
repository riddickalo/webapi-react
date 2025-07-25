import { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, MenuItem, Grid, Box, TextField, Button } from "@mui/material";

export default function MaintainFilterSection({ showSection, selectedNc, selectChange, handleSetFilter }) {    
    const [ncList, setNcList] = useState([]);

    const handleChange = ({ target }) => selectChange(target.name, target.value);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/status')
            .then(({data, }) => {
                setNcList(data);
            }).catch((err) => console.error(err));
    }, []);
    
    return (
        <Collapse in={showSection === 'filter'}>
            <Box m={1} alignContent='center' alignItems='center' maxWidth='95%' 
                sx={{ 
                    bgcolor: '#e0e0e0',
                    border: '3px solid #5e75ae',
                    borderRadius: 2,
                    '& .MuiTextField-root': { width: "90%" },
                    '& .MuiButton-root': { width: "90%" },
                    '.p': { fontSize: '16px' }, }} > 
                <Grid container mt={1} mb={4} spacing={2} width='100%'>
                    <Grid item xs={12}>
                        <TextField select align='left' label='機台名稱' name='nc_id' 
                            onChange={handleChange} value={selectedNc.nc_id} >
                                {ncList.map((nc) => (     // should be '(' not'{'
                                    <MenuItem value={nc.nc_id}>
                                        {nc.nc_id}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" name='SetFilterButton' onClick={handleSetFilter}
                                sx={{ color: '#010101', bgcolor: '#bfbfbf', ':hover': { bgcolor: '#8e8e8e' } }}>
                                查詢</Button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}
