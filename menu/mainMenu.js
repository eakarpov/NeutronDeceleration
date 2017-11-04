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
    label: 'Помощь',
    submenu: [
      {
        label: 'Инструкция пользователю',
        click() {
          require('electron').shell.openExternal('https://electron.atom.io')
        }
      }
    ]
  },
  {
    label: 'О программе'
  },
];

if (process.env.NODE_ENV === 'development') {
  template.push({
    label: 'Разаработчику',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
    ]
  })
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);