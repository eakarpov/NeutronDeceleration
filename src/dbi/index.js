const Database = require('nedb');
import init from './init';
import {validatePassword, getUser} from './auth';

const db = new Database('my.db');

const getDb = () => db;

export default {
  getDb,
  init,
  validatePassword,
  getUser
};