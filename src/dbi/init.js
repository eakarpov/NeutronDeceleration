import dbi from './index';
import sha1 from 'sha1';

export default () => {
  const db = dbi.getDb();

  // db.run("CREATE TABLE if not exists users (login TEXT, password TEXT)");
  //
  // const adminFromBase = db.run("SELECT FROM users WHERE login = admin");
  //
  // if (adminFromBase === null) {
  //   const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
  //   const admin = {
  //     login: 'root',
  //     password: 'toor'
  //   };
  //   stmt.run(admin.login, sha1(admin.password));
  //   stmt.finalize();
  // }
};