# JackTech WarRoom GUI

Build views for monitoring machine status and alarms. Download production reports and maintainance reminder.

## Framework

- Node.js v20.20
- React v18.3
- MaterialUI

## File Structure

v1.0 => component based, for small project  
v2.0 => feature based

```sh
- build     # built static html
- public    # resource on pages
- src
    |- features
        |- Alarms               # alarm pages
        |- General-settings     # NC, maintain item setting pages
        |- Header               # login, logout header
        |- NC                   # NC status pages
        |- Reports              # report page
        |- Sidebar              # menu, sidebar
        |- Sys-settings         # system, notification settings
    |- mock_server              # mock data server
    |- shared                   # cross-feature components
        |- assets               # resources
        |- contexts             # react context
        |- utils                # common func
    |- tests                    # where test compoenets go
    |- App.jsx
    |- index.js
```

## Demo
User info for demo as below.
```yaml
# refers to src/mock_server/data/users.js
- admin:
    user_name: 'admin',
    user_password: 'admin123',
    permissions: 
        - NC_Maintain: 'edit'
        - Report: 'edit'
        - Setting_NCstatus: 'edit'
        - Setting_Maintain: 'edit'
        - Sys_Account: 'edit'
        - Sys_Notification: 'edit'
    enable: true

- operator:
    user_name: 'operator1'
    user_password: 'operator123'
    permissions: 
        - NC_Maintain: 'view'
        - Report: 'view'
        - Setting_NCstatus: 'view'
        - Setting_Maintain: 'edit'
        - Sys_Account: 'none'
        - Sys_Notification: 'none'
    enable: true

- viwer:
    user_name: 'viewer'
    user_password: 'viewer123'
    permissions: 
        - NC_Maintain: 'view'
        - Report: 'view'
        - Setting_NCstatus: 'view'
        - Setting_Maintain: 'none'
        - Sys_Account: 'none'
        - Sys_Notification: 'none'
    enable: true
``` 

## Scripts

For installing the dependencies,

```sh
npm install
```

Start development environment, recompile by listening file saving event. This will export the env file with "development" postfix.

```sh
npm run start
```

Build static HTML page. This will export the env file with "production" postfix.

```sh
npm run build
```

For the serving static pages in middle server, it needs to build project and push to repository.

```sh
npm run deploy
```

## Note

Building with node:18.x is no longer an option for vercel.  
CRA is deprecated by Facebook(Meta), last version is react-script v5.x

I might reengineer this...?
