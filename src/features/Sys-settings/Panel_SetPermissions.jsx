import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material';

/**
 * 可重用的權限設定面板
 * 用於新增用戶 (AddUserSection) 和編輯用戶權限 (AccountSubTable)
 */
export default function SetPermissionsSubPanel({ permissions = {}, onChange, disabled = false, limitedKeys = null /* 限制顯示的權限鍵值，如果為 null 則顯示所有權限 */}) {
    // 權限選項
    const permissionOptions = [
        { value: 'none', label: '無權限' },
        { value: 'view', label: '唯讀' },
        { value: 'edit', label: '編輯' }
    ];

    // 所有權限項目配置
    const allPermissionItems = [
        { key: 'Sys_Notification', label: '系統通知設定' },
        { key: 'NC_Maintain', label: '機台保養紀錄' },
        { key: 'Report', label: '報表下載' },
        { key: 'Setting_Maintain', label: '保養項目設定' },
        { key: 'Setting_NCstatus', label: '機台狀態設定' },
    ];

    // 根據 limitedKeys 過濾權限項目
    const permissionItems = limitedKeys 
        ? allPermissionItems.filter(item => limitedKeys.includes(item.key))
        : allPermissionItems;

    const handlePermissionChange = (permissionKey) => (event) => {
        const newPermissions = {
            ...permissions,
            [permissionKey]: event.target.value
        };

        console.log('Updated permissions:', newPermissions);
        
        if (onChange) {
            onChange('permissions', newPermissions);
        }
    };

    return (
        <Box sx={{ 
            p: 2, 
            bgcolor: '#e0e0e0', 
            borderRadius: 1,
            border: '1px solid #e0e0e0'
        }}>
            <Typography variant="h6" align='left' sx={{ mb: 2, color: '#333' }}>
                權限設定
            </Typography>
            
            <Grid container spacing={2}>
                {permissionItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.key}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label={item.label}
                            value={permissions[item.key] || 'none'}
                            onChange={handlePermissionChange(item.key)}
                            disabled={disabled}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: disabled ? '#f5f5f5' : 'white',
                                }
                            }} >
                            {permissionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}