import * as api from "../api/players";

export const createPlayer = (player) => async (dispatch) => {
    try {
        const { data } = await api.createPlayer(player);
        dispatch({ type: "CREATE_PLAYER", payload: data });
    } catch (e) {
        console.log(`CREATE_PLAYER: ${e}`);
    }
}

export const getPlayers = () => async (dispatch) => {
    try {
        const { data } = await api.getPlayers();
        dispatch({ type: "FETCH_ALL_PLAYERS", payload: data });
    } catch (e) {
        console.log(`FETCH_ALL_PLAYERS: ${e}`);
    }
}

export const getPlayer = (id) => async (dispatch) => {
    try {
        const { data } = await api.getPlayer(id);
        dispatch({ type: "FETCH_PLAYER", payload: data });
    } catch (e) {
        console.log(`FETCH_PLAYER: ${e}`);
    }
}

export const awardPlayer = (sponsorship) => async (dispatch) => {
    try {
        const { data } = await api.awardPlayer(sponsorship);
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