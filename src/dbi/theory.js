import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function getTheory() {
  const db = dbi.getDb();
  const theory = await async(db.find, { title: "theory" });
  return theory[0] && theory[0].content;
}

export async function saveTheory(content) {
  await async(dbi.getDb().update, { title: "theory"}, { $set: {content} }, {upsert: true});
  return true;
}