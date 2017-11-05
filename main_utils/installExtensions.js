const installer = require('electron-devtools-installer');

const installExtensions = async () => {
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  return Promise
    .all(extensions.map(name => installer.default(installer[name], true)))
    .catch(console.log);
};

module.exports = installExtensions;
