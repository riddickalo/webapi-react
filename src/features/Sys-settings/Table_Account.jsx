import { useState } from "react";
import { Box, Stack, Button, TextField, FormControlLabel, Checkbox, Typography, Collapse } from "@mui/material";
import { SaveRounded, CancelRounded } from "@mui/icons-material";
import { green, red, blue } from "@mui/material/colors";
import axios from "axios";
import { EnableUserIcon, EditUserButton } from "../../shared/components/Icons";
import NoData from '../../shared/components/NoData';
import { StyledTableCell, StyledTableRow, StyledSubTable } from "../../shared/components/StyledTable";
import { convertTimeFormat } from '../../shared/utils/time_format';
import SetPermissionsSubPanel from "./Panel_SetPermissions";

export default function AccountSubTable({ data = [], isEdit, editItem, handleClick, handleChange, canEdit = false }) {
    const [resetPassword, setResetPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const tableHead = ['使用者帳號', '使用者暱稱', '最後登入時間', '啟用狀態', '操作'];

    const handleResetPasswordChange = (event) => {
        setResetPassword(event.target.checked);
    };

    const handleSaveUser = async (userId) => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            
            // 更新使用者資訊
            await axios.post(process.env.REACT_APP_API_URL + '/auth/user', {
                edit_info: {
                    user_name: userId,
                    user_alias: editItem.user_alias,
                    permissions: editItem.permissions,
                    enable: editItem.enable
                }}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // 如果勾選重置密碼，則重置密碼
            if (resetPassword) {
                await axios.post(process.env.REACT_APP_API_URL + '/auth/reset-password', {
                    edit_info: {user_name: userId }
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }

            // 調用父組件的完成處理
            handleClick({ target: { name: `Save-${userId}` } });
            setResetPassword(false);
        } catch (error) {
            console.error('更新使用者失敗:', error);
            alert('更新使用者失敗，請稍後再試');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancelEdit = (userId) => {
        handleClick({ target: { name: `Cancel-${userId}` } });
        setResetPassword(false);
    };
        
    const bodyData = (statusData) => {
        if(statusData === null || statusData.length === 0) {
            return (<NoData />);
        } else {
            return (
                statusData.map((row) => [
                    <StyledTableRow key={row.user_name}>
                        <StyledTableCell align='center'>{row.user_name}</StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.user_name) ? 
                                <TextField 
                                    size='small' 
                                    name='user_alias' 
                                    value={editItem?.user_alias || row.user_alias} 
                                    onChange={({target}) => handleChange(target.name, target.value)} 
                                    sx={{ minWidth: '120px' }}
                                /> : 
                                row.user_alias
                            }
                        </StyledTableCell>
                        <StyledTableCell align='center'>{convertTimeFormat(row.last_login)}</StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.user_name) ? 
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => handleChange('enable', !editItem?.enable)}
                                    sx={{
                                        color: editItem?.enable ? green[600] : red[600],
                                        borderColor: editItem?.enable ? green[600] : red[600],
                                        ':hover': {
                                            borderColor: editItem?.enable ? green[800] : red[800],
                                            bgcolor: editItem?.enable ? green[50] : red[50]
                                        },
                                        fontSize: '12px',
                                        minWidth: '60px'
                                    }}
                                >
                                    {editItem?.enable ? '啟用' : '停用'}
                                </Button> :
                                <EnableUserIcon actStatus={row.enable} />
                            }
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                            {(isEdit === row.user_name)? 
                                <Stack spacing={1} direction={'column'} alignItems={'center'}>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={resetPassword}
                                                onChange={handleResetPasswordChange}
                                                size="small"
                                            />
                                        }
                                        label="重置密碼" 
                                        sx={{ fontSize: '12px' }}
                                    />
                                    <Stack spacing={1} direction={'row'}>
                                        <Button 
                                            size="small"
                                            variant="contained"
                                            startIcon={<SaveRounded />}
                                            onClick={() => handleSaveUser(row.user_name)}
                                            disabled={isSubmitting}
                                            sx={{ 
                                                bgcolor: blue[600], 
                                                ':hover': { bgcolor: blue[800] },
                                                fontSize: '12px',
                                                minWidth: '80px'
                                            }}>
                                            {isSubmitting ? '儲存中...' : '完成'}
                                        </Button>
                                        <Button 
                                            size="small"
                                            variant="outlined"
                                            startIcon={<CancelRounded />}
                                            onClick={() => handleCancelEdit(row.user_name)}
                                            disabled={isSubmitting}
                                            sx={{ 
                                                color: red[600],
                                                borderColor: red[600],
                                                ':hover': { 
                                                    borderColor: red[800],
                                                    bgcolor: red[50]
                                                },
                                                fontSize: '12px',
                                                minWidth: '80px'
                                            }}>
                                            取消
                                        </Button>
                                    </Stack>
                                </Stack>:
                                <EditUserButton 
                                    id={row.user_name} 
                                    onClick={handleClick} 
                                    disabled={!canEdit || row.user_name === 'admin'} 
                                /> 
                            }
                        </StyledTableCell>
                    </StyledTableRow>,
                    
                    // 編輯權限時在該行下方顯示權限設定面板
                    isEdit === row.user_name && editItem && (
                        <StyledTableRow key={`${row.user_name}-permissions`}>
                            <StyledTableCell colSpan={5} sx={{ p: 0, border: 'none' }}>
                                <Collapse in={true}>
                                    <Box sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 1, margin: 1 }}>
                                        <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                                            編輯 {row.user_name} 的權限設定
                                        </Typography>
                                        <SetPermissionsSubPanel 
                                            permissions={editItem.permissions || {}}
                                            onChange={handleChange}
                                            limitedKeys={['Sys_Notification', 'NC_Maintain', 'Report', 'Setting_Maintain', 'Setting_NCstatus']}
                                        />
                                    </Box>
                                </Collapse>
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                ]).flat().filter(Boolean)
            );
        }
    }

    return (
        <Box>
            <StyledSubTable
                ariaLabel='Account-SubTable'
                headData={tableHead}
                bodyData={bodyData(data)} />
        </Box>
    );
}


