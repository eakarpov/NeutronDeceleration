import bcrypt from "bcryptjs";
import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function getUser(login) {
  const db = dbi.getDb();
  const user = await async(db.find, { login });
  return user[0];
}

export async function validatePassword (login, password) {
  const user = await getUser(login);
  if (!!user) return false;
  else {
    console.log(password);
    console.log(user.password);
    const checkPasswordResult = await bcrypt.compare(password, user.password);
    return checkPasswordResult === true ? user : false;
  }
}
