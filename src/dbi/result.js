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
