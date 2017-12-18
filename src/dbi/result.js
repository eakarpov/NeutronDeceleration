import dbi from './index';
import async from '../helpers/asyncWrapper';

export const saveResult = async (result, userId, date=Date.now()) => {
    const db = await dbi.getDb();
    await async(db.insert, { result, user: userId, date });
    return true;
}

export const getAllResults = async (userId) => {
    const db = await dbi.getDb();
    if (userId) {
        const res = await async(db.find, { user: userId });
        return res;
    } else {
        const res = await async(db.find, {});
        return res.filter(el => el.user !== void 0);
    }
}

export const removeResult = async (resultId) => {
    const db = await dbi.getDb();
    const resultFromBase = await async(db.find, { _id: resultId });
    if (typeof resultFromBase[0] === 'undefined') return false;
    await async(db.remove, resultFromBase[0]);
    return true;
}
