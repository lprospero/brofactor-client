import * as api from "../api/players";
import { IPlayer } from '../models/player';
import { app, credentials } from '../utils/mongo.client.ts';

export const createPlayer = (player) => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.createPlayer(player);
        dispatch({ type: "CREATE_PLAYER", payload: data });
    } catch (e) {
        console.log(`CREATE_PLAYER: ${e}`);
    }
}

export const getPlayers = () => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.getPlayers();
        dispatch({ type: "FETCH_ALL_PLAYERS", payload: data });
    } catch (e) {
        console.log(`FETCH_ALL_PLAYERS: ${e}`);
    }
}

export const getPlayer = (id) => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.getPlayer(id);
        dispatch({ type: "FETCH_PLAYER", payload: data });
    } catch (e) {
        console.log(`FETCH_PLAYER: ${e}`);
    }
}

export const awardPlayer = (sponsorship) => async (dispatch) => {
    try {
        const user: Realm.User = await app.logIn(credentials);
        const data = await user.functions.awardPlayer(sponsorship);
        dispatch({ type: "AWARD_PLAYER", payload: data });
    } catch (e) {
        console.log(`AWARD_PLAYER: ${e}`);
    }
}

export const clearPlayers = () => async (dispatch) => {
    try {
        dispatch({ type: "CLEAR_PLAYERS", payload: [] });
    } catch (e) {
        console.log(`CLEAR_PLAYERS: ${e}`);
    }
}