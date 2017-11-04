import init from './init';
import {validatePassword, getUser} from './auth';
import { remote } from 'electron';

const db = remote.getGlobal('db');

const getDb = () => db;

export default {
  getDb,
  init,
  validatePassword,
  getUser
};