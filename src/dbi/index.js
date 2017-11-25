import init from './init';
import {validatePassword, getUser} from './auth';
import { remote } from 'electron';
import {getAllGroups, registerGroup} from "./groups";
import {getAllUsers, registerUser} from "./user";
import {saveTheory, getTheory} from './theory';

const db = remote.getGlobal('db');

const getDb = () => db;

export default {
  getDb,
  init,
  validatePassword,
  getUser,
  getAllGroups,
  registerGroup,
  registerUser,
  getAllUsers,
  saveTheory,
  getTheory
};