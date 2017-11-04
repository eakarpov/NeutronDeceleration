const electron = require('electron');
const Datastore = require('nedb');

const {app} = electron;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start({
  companyName: 'МИФИ Кафедра №22 "Кибернетика"',
  productName: 'Лабораторная система по курсу ММФП',
  submitURL: 'localhost',
  autoSubmit: true,
  extra: {
    'prod': 'Лабораторная система по курсу ММФП',
    'key': '0.0.1',
    'email': 'eakarpov@yandex.ru',
    'comments': ''
  }
});

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  return Promise
    .all(extensions.map(name => installer.default(installer[name], true)))
    .catch(console.log);
};

let mainWindow = null;

db = new Datastore({filename: 'my.db'});
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

  mainWindow = new BrowserWindow({width: 1280, height: 720});
  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  require('./menu/mainMenu');
});