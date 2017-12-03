import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function getAllGroups() {
  const db = dbi.getDb();
  const groups = await async(db.find, {});
  return groups.filter(el => el.groupName !== void 0);
}

export async function registerGroup(name) {
  const db = dbi.getDb();
  const group = await async(db.find, { groupName: name });
  if (group[0] !== void 0) return false;
  await async(db.insert, { groupName: name });
  return true;
}

export async function removeGroup(name) {
  const db = dbi.getDb();
  const group = await async(db.find, { groupName: name });
  const groups = await async(db.find, {});
  groups.filter(el => el.login !== void 0 && el.group === group[0]._id).forEach(async el => await dbi.removeUser(el.login));
  await async(db.remove, group[0]);
  return group[0];
}