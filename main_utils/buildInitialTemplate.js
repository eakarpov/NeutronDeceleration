function buildInitialTemplate(mainWindow) {

  const template = [
    {
      label: 'Выход',
      submenu: [
        {
          label: 'Выйти из программы',
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
    template.push({
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
    })
  }

  return template;
}

module.exports = buildInitialTemplate;
