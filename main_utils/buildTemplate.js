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
      label: 'Помощь',
      submenu: [
        {
          label: 'Инструкция пользователю',
          click() {
            console.log('clicked');
            mainWindow.webContents.send('transitionTo', '/user_help')
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
      ]
    })
  }

  return template;
}

module.exports = buildTemplate;
