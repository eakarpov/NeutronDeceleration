import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function registerUser(user) {
  const db = dbi.getDb();
  const userFromBase = await async(db.find, { login: user.login });
  if (typeof userFromBase[0] !== 'undefined') return false;
  await async(db.insert, user);
  return true;
}

export async function getAllUsers() {
  const db = dbi.getDb();
  const users = await async(db.find, {});
  return users.filter(el => typeof el.login !== 'undefined' && typeof el.name !== 'undefined');
}

export async function editUser(user) {
  const db = dbi.getDb();
  const userFromBase = await async(db.find, { login: user.username });
  if (typeof userFromBase[0] === 'undefined') return false;
  await async(db.update, userFromBase[0], user);
  return true;
}

export async function removeUser(login) {
  const db = dbi.getDb();
  const userFromBase = await async(db.find, { login });
  if (typeof userFromBase[0] === 'undefined') return false;
  console.log(userFromBase[0]);
  await async(db.remove, userFromBase[0]);
  return true;
}
