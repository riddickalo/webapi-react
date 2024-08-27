// test page
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
// import '@mui/material'
// import { createTheme } from "@mui/material";

// export const theme = createTheme({
//     components: {
//         MuiListItemText: {
            
//         },
//         MuiAccordionSummary: {

//         },
//         MuiAccordionDetails: {

//         },
//     }
// });
const api_url = 'http://localhost:8083/api/device-events'

function ApiData () {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(api_url, {
            params: { startTime: 20240827000000 }
        }).then((resp) => {
            const temp = resp.data;
            setData(temp[1]);
            console.log(temp);
            console.log(temp[0]);
        }).catch((err) => console.error(err));
    }, []);

    if (data !== null) {
        return (
            <div>
                {/* <h2>{data.deviceName}</h2>
                <h5>{data.exeProgName}</h5>
                <h5>{data.running}</h5>
                <h5>{data.emergency}</h5>
                <h6>{data.timestamp}</h6> */}
            </div>
        );
    } else {
        return (
            <div>
                <h3>No data</h3>
            </div>
        );
    }
    
}

export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
            <Button variant="contained" href='/'> Back to HomePage</Button>
            {ApiData()}
        </div>
    );
}
