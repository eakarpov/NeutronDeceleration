import init from './init';
import {validatePassword, getUser} from './auth';
import { remote } from 'electron';
import {getAllGroups, registerGroup, removeGroup} from "./groups";
import {getAllUsers, registerUser, removeUser, editUser} from "./user";
import {
  addTest, generateTestSuite,
  getAllTests
} from "./test";

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
  removeUser,
  editUser,
  removeGroup,
  addTest,
  generateTestSuite,
  getAllTests
};