import bcrypt from "bcryptjs";
import dbi from './index';
import async from '../helpers/asyncWrapper';
import {ROLE} from '../helpers/enums';

export default async () => {
  const db = dbi.getDb();
  const adminFromBase = await async(db.find, { login:  'root' });
  if (adminFromBase.length === 0) {
    const admin = {
      login: 'root',
      //TODO: The maximum input length is 72 bytes (UTF8 encoded characters use up to 4 bytes) so we must check that password is no longer than 18 characters
      password: await bcrypt.hash('toor', 10),
      role: ROLE.ADMIN
    };
    db.insert(admin);
  }
};