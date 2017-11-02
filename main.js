const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start({
  companyName: 'MEPhI Cybernetic Department',
  productName: 'MMFP Neutron Deceleration',
  submitURL: 'localhost',
  autoSubmit: true,
  extra: {
    'prod': 'MMFP Neutron Deceleration',
    'key': '0.0.1',
    'email': 'eakarpov@yandex.ru',
    'comments': 'Some news'
  }
});

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});