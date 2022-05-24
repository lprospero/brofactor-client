import * as api from "../api/users";

export const validateUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.validateUser(user);
        dispatch({ type: "VALIDATE_USER", payload: data });
    } catch (e) {
        console.log(`VALIDATE_USER: ${e}`);
    }
}