import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function getAllGroups() {
  const db = dbi.getDb();
  const groups = await async(db.find, {});
  return groups.filter(el => typeof el.groupName !== 'undefined');
}

export async function registerGroup(name) {
  const db = dbi.getDb();
  const group = await async(db.find, { groupName: name });
  if (typeof group[0] !== 'undefined') return false;
  await async(db.insert, { groupName: name });
  return true;
}

export async function removeGroup() {

}