import * as api from "../api/awards";

export const createAward = (award) => async (dispatch) => {
    try {
        const { data } = await api.createAward(award);
        dispatch({ type: "CREATE_AWARD", payload: data });
    } catch (e) {
        console.log(`CREATE_AWARD: ${e}`);
    }
}

export const getAwards = () => async (dispatch) => {
    try {
        const { data } = await api.getAwards();
        dispatch({ type: "FETCH_ALL_AWARDS", payload: data });
    } catch (e) {
        console.log(`FETCH_ALL_AWARDS: ${e}`);
    }
}