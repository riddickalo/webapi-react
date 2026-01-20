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
