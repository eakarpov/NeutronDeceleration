import dbi from './index';
import sha1 from 'sha1';
import async from '../helpers/asyncWrapper';

export async function getUser(login) {
  const db = dbi.getDb();
  const user = await async(db.find, { login });
  return user[0];
}

export async function validatePassword (login, password) {
  const user = await getUser(login);
  return !!user
    ? sha1(password) === user.password
      ? user
      : false
    : false;
}
