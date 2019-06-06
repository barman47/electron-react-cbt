const { app, BrowserWindow, ipcMain } = require('electron');
const uuid = require('uuid');
const isDev = require('electron-is-dev');
const bcrypt = require('bcryptjs');
const os = require('os');
const path = require('path');

const User = require('../models/User');

const { sequelize } = require('../utils');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // mainWindow.setMenu(null);
    mainWindow.maximize();

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

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
    const user = {
        id: uuid(),
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password
    };
    User.findOne({ 
        where: {
            username: user.username
        }
    })
    .then(returnedUser => {
        if(returnedUser){
            mainWindow.webContents.send('user-exists', { username: 'Username already taken!' });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.log(err);
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    user.password = hash;
                    User.create(user)
                        .then(() => {
                            console.log('Student added successfully...');
                             mainWindow.webContents.send('registration-success');
                        })
                        .catch(err => console.log('User not saved ', err));
                });
            });
        }
    })
    .catch(err => console.log(err));
});

ipcMain.on('login-user', (event, data) => {
    console.log('data ', data);
    User.findOne({
        where: {
            username: data.username
        }
    })
        .then(user => {
            if(user) {
                // Check Password
                console.log('user ', user.password);
                bcrypt.compare(data.password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            console.log('Password match')
                            const authenticatedUser = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username
                            };
                            mainWindow.webContents.send('login-user', authenticatedUser);
                        } else {
                            console.log('Incorrect Password');
                            mainWindow.webContents.send('incorrect-password', { password: 'Incorrect Password!' });
                        }
                    });
            } else {
                mainWindow.webContents.send('user-not-found', { username: 'User does not exist.' });
            }
        });
})

app.on('ready', () => {
    sequelize();
    createWindow();
});