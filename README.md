# JackTech WarRoom Front-end
Build views for monitoring machine status and alarms. Download production reports and maintainance reminder.
## Framework
- Node.js v18.20
- React v18.3
- MaterialUI
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

