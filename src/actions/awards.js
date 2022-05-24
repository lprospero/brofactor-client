import * as api from "../api/awards";
import { app, credentials } from '../utils/mongo.client.ts';

export const createAward = (award) => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.createAward(award);
        dispatch({ type: "CREATE_AWARD", payload: data });
    } catch (e) {
        console.log(`CREATE_AWARD: ${e}`);
    }
}

export const getAwards = () => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.getAwards();
        dispatch({ type: "FETCH_ALL_AWARDS", payload: data });
    } catch (e) {
        console.log(`FETCH_ALL_AWARDS: ${e}`);
    }
}