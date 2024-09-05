import React from "react";
import { TextField } from "@mui/material";
import NoData from "../components/NoData";
import { EditNcInfoButton, SaveNcInfoButton } from "../components/Icons";
import { StyledSubTable, StyledTableCell, StyledTableRow } from "../components/StyledTable";

export default function SettingStatusSubTable({ data, isEdit, onTriggerEdit, editedStatus, setEditedStatus }) {
    /*
        data: 機台狀態資料
        isEdit: 標示正在編輯的機台資料
        onTriggerEdit: 點擊"編輯"按鍵行為
        editedStatus: state from parent，編輯後的資料，送至後端更新
        setEditedStatus: state updating method
    */
    const tableHead = ['機台IP', '機台廠區', '機台產線', '機台工作站', '機台名稱', '操作']
    
    const handleTextChange = ({target, }) => {
        setEditedStatus(prev => ({
            ...prev, 
            [target.name]: target.value,
        }));
    }

    const bodyData = (statusData, onTriggerEdit) => {
        if(statusData === null || statusData.length === 0) {
            return (<NoData />);
        } else {
            return (
                statusData.map((row) => (
                    <StyledTableRow key={row.nc_id} >
                        <StyledTableCell align='center'>{row.nc_ip}</StyledTableCell>
                        <StyledTableCell component={'th'} scope="row" align='center'>
                            {(isEdit === row.nc_id)? 
                                <TextField size='small' name={`region`} value={editedStatus.region} onChange={handleTextChange} />: 
                                row.region}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.nc_id)? 
                                <TextField size='small' name={`prod_line`} value={editedStatus.prod_line} onChange={handleTextChange} />: 
                                row.prod_line}</StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.nc_id)?
                                <TextField size='small' name={`station`} value={editedStatus.station} onChange={handleTextChange} />: 
                                row.station}</StyledTableCell>
                        <StyledTableCell align='center'>{row.nc_id}</StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.nc_id)? <SaveNcInfoButton id={row.nc_id} onClick={onTriggerEdit} />:
                                <EditNcInfoButton id={row.nc_id} onClick={onTriggerEdit} />}</StyledTableCell>
                    </StyledTableRow>
            )));
        }
    } 
    
    return <StyledSubTable
                ariaLabel='settingStatus-subtable'
                headData={tableHead}
                bodyData={bodyData(data, onTriggerEdit)} />;
}