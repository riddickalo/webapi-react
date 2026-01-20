export const mockUsers = [
  {
    user_name: 'admin',
    user_password: 'admin123',
    permissions: {
        NC_Maintain: 'edit',
        Report: 'edit',
        Setting_NCstatus: 'edit',
        Setting_Maintain: 'edit',
        Sys_Account: 'edit',
        Sys_Notification: 'edit'
    },
    enable: true,
    last_login: '2026-01-20T10:30:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2026-01-20T10:30:00.000Z',
  },
  {
    user_name: 'operator1',
    user_password: 'operator123',
    permissions: {
        NC_Maintain: 'view',
        Report: 'view',
        Setting_NCstatus: 'view',
        Setting_Maintain: 'edit',
        Sys_Account: 'none',
        Sys_Notification: 'none'
    },
    enable: true,
    last_login: '2026-01-20T09:15:00.000Z',
    createdAt: '2025-01-05T00:00:00.000Z',
    updatedAt: '2026-01-20T09:15:00.000Z',
  },
  {
    user_name: 'viewer',
    user_password: 'viewer123',
    permissions: {
        NC_Maintain: 'view',
        Report: 'view',
        Setting_NCstatus: 'view',
        Setting_Maintain: 'none',
        Sys_Account: 'none',
        Sys_Notification: 'none'
    },
    enable: true,
    last_login: '2026-01-19T14:00:00.000Z',
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2026-01-19T14:00:00.000Z',
  },
  {
    user_name: 'disabled_user',
    user_password: 'disabled123',
    permissions: {
        NC_Maintain: 'none',
        Report: 'none',
        Setting_NCstatus: 'none',
        Setting_Maintain: 'none',
        Sys_Account: 'none',
        Sys_Notification: 'none'
    },
    enable: false,
    last_login: '2025-12-01T00:00:00.000Z',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-12-01T00:00:00.000Z',
  },
];

