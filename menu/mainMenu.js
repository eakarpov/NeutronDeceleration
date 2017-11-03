const {Menu} = require('electron');

const template = [
  {
    label: 'Файл',
    submenu: [
      {
        label: 'Выйти',
        role: 'close'
      }
    ]
  },
  {
    label: 'Вид',
    submenu: [
      {
        label: 'Админ',
        click() {}
      }
    ]
  },
  {
    label: 'Помощь',
    submenu: [
      {
        label: 'Инструкция пользователю',
        click() {
          require('electron').shell.openExternal('https://electron.atom.io')
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);