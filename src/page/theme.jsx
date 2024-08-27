// test page
import React, { useEffect, useState } from "react";
import axios from "axios";
// import '@mui/material'
import { createTheme } from "@mui/material";

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

function apiData () {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(api_url, {
            params: { startTime: 20240827000000 }
        }).then((resp) => {
            const temp = resp.data;
            data = temp[1];
            console.log(temp[0]);
        })
    }, []);

    return (
        <div>
            <h2>{data.deviceName}</h2>
            <h5>{data.exeProgName}</h5>
            <h5>{data.running}</h5>
            <h5>{data.emergency}</h5>
            <h6>{data.timestamp}</h6>
        </div>
    );
}

export default function testPage() {
    return (
        <div>
            <h1>Test Page</h1>
            {apiData()}
        </div>
    );
}
