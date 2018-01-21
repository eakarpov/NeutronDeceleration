const electron = require('electron');
const Datastore = require('nedb');
const buildInitialTemplate = require("./main_utils/buildInitialTemplate");
const installExtensions = require("./main_utils/installExtensions");
const path = require('path');
const fork = require('child_process').fork;
const fs = require('fs');
const crypter = require('./crypter/textCrypter');

const {app, ipcMain} = electron;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start({
  companyName: 'МИФИ Кафедра №22 "Кибернетика"',
  productName: 'Лабораторная система по курсу ММФП',
  submitURL: 'localhost',
  autoSubmit: true,
  extra: {
    'prod': 'Лабораторная система по курсу ММФП',
    'key': '0.2.0',
    'email': 'eakarpov@yandex.ru'
  }
});

let mainWindow = null;
let initialTemplate = null;

db = new Datastore({filename: 'lab.db'});
db.loadDatabase(function (err) {
  if (err) console.log(err);
});
global.db = db;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {

  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegrationInWorker: true
    }
  });
  if (process.env.NODE_ENV === 'development') {
    mainWindow.maximize();
  } else {
    mainWindow.setFullScreen(true);
  }
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  initialTemplate = buildInitialTemplate(mainWindow);
  const menu = electron.Menu.buildFromTemplate(initialTemplate);
  electron.Menu.setApplicationMenu(menu);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

ipcMain.on('export', function(e, ...args) {
  const result = args[0];
  const resultJSONString = JSON.stringify(result);
  const cryptedResult = crypter.encrypt(resultJSONString);
  fs.writeFileSync('./output', cryptedResult);
  mainWindow.webContents.send('exported', true);
});

ipcMain.on('user_logged_in', function() {
  let containsAdmin = false;
  let containsLogout = false;
  initialTemplate.forEach(obj => containsAdmin = obj['label'] === 'Администратору' ? true : containsAdmin);
  initialTemplate[0].submenu.forEach(el => containsLogout = el.label === 'Выйти из аккаунта' ? true : containsLogout);
  if (containsAdmin && containsLogout) return;
  const newTemplate = [...initialTemplate];
  if (!containsLogout) {
    newTemplate[0].submenu.push({
      label: 'Выйти из аккаунта',
      click() {
        let containsAdmin = false;
        initialTemplate.forEach(obj => containsAdmin = obj['label'] === 'Администратору' ? true : containsAdmin);
        if (containsAdmin) {
          const newTemplate2 = [...initialTemplate.slice(0, 2), ...initialTemplate.slice(3)];
          newTemplate2[0].submenu = [...newTemplate2[0].submenu.slice(0, newTemplate2[0].submenu.length - 1)];
          const menu = electron.Menu.buildFromTemplate(newTemplate2);
          electron.Menu.setApplicationMenu(menu);
        }
        mainWindow.webContents.send('logout')
      }
    });
  }
  const menu = electron.Menu.buildFromTemplate(newTemplate);
  electron.Menu.setApplicationMenu(menu);
});

ipcMain.on('admin_logged_in', function () {
  let containsAdmin = false;
  let containsLogout = false;
  initialTemplate.forEach(obj => containsAdmin = obj['label'] === 'Администратору' ? true : containsAdmin);
  initialTemplate[0].submenu.forEach(el => containsLogout = el.label === 'Выйти из аккаунта' ? true : containsLogout);
  const newTemplate = [...initialTemplate];
  if (!containsAdmin) {
    const adminMenu = {
      label: 'Администратору',
      submenu: [
        {
          label: 'Инструкция администратора',
          click() {
            mainWindow.webContents.send('transitionTo', '/instruction/admin')
          }
        },
        {
          label: 'Поменять данные авторизации',
          click() {
            mainWindow.webContents.send('transitionTo', '/admin/change_credentials')
          }
        }
      ]
    };
    newTemplate.splice(2, 0, adminMenu);
0  }
  if (!containsLogout) {
    newTemplate[0].submenu.push({
      label: 'Выйти из аккаунта',
      click() {
        let containsAdmin = false;
        newTemplate.forEach(obj => containsAdmin = obj['label'] === 'Администратору' ? true : containsAdmin);
        if (containsAdmin) {
          const newTemplate2 = [...newTemplate.slice(0, 2), ...newTemplate.slice(3)];
          newTemplate2[0].submenu = [...newTemplate2[0].submenu.slice(0, newTemplate2[0].submenu.length - 1)];
          const menu = electron.Menu.buildFromTemplate(newTemplate2);
          electron.Menu.setApplicationMenu(menu);
        }
        mainWindow.webContents.send('logout')
      }
    });
  }
  const menu = electron.Menu.buildFromTemplate(newTemplate);
  electron.Menu.setApplicationMenu(menu);
});
