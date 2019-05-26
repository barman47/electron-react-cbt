const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const os = require('os');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        maximixed: true,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.maximize();

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

    mainWindow.loadURL(startUrl);

    if(isDev) {
        BrowserWindow.addDevToolsExtension(path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'));
        BrowserWindow.addDevToolsExtension(path.join(os.homedir(), '/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'));
    }

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.on('register-student', (event, data) => {
    console.log(data);
});

app.on('ready', () => {
    createWindow();
});