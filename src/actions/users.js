import * as api from "../api/users";
import { app, credentials } from '../utils/mongo.client.ts';

export const validateUser = (player) => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.validateUser(player);
        dispatch({ type: "VALIDATE_USER", payload: data });
    } catch (e) {
        console.log(`VALIDATE_USER: ${e}`);
    }
}