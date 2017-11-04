import dbi from './index';
import sha1 from 'sha1';

export const getUser = login => {
  const db = dbi.getDb();
  // const user = db
  //   .prepare("SELECT * FROM users where login = ?")
  //   .run(login);
  return !!user;
};

export const validatePassword = (login, password) => {
  const user = getUser(login);
  return !!user
    ? sha1(password) === user.password
    : false;
};
