import dbi from './index';
import sha1 from 'sha1';
import async from '../helpers/asyncWrapper';

export default async () => {
  const db = dbi.getDb();

  const adminFromBase = await async(db.find, { login:  'root' });
  if (adminFromBase.length === 0) {
    const admin = {
      login: 'root',
      password: sha1('toor')
    };
    db.insert(admin);
  }
};