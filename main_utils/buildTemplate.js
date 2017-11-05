function buildTemplate(mainWindow) {

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
      label: 'Пользователю',
      submenu: [
        {
          label: 'Инструкция пользователя',
          click() {
            mainWindow.webContents.send('transitionTo', '/instruction/user')
          }
        }
      ]
    }
  ];

  if (process.env.NODE_ENV === 'development') {
    template.push(
      {
        label: 'Администратору',
        submenu: [
          {
            label: 'Инструкция администратора',
            click() {
              mainWindow.webContents.send('transitionTo', '/instruction/admin')
            }
          }
        ]
      },
      {
        label: 'Разработчику',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {
            label: 'Инструкция разаработчика',
            click() {
              mainWindow.webContents.send('transitionTo', '/instruction/developer')
            }
          }
        ]
      }
    )
  }

  return template;
}

module.exports = buildTemplate;
