const playersReducer = (players = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_PLAYERS":
            return action.payload;
        case "CREATE_PLAYER":
            return action.payload;
        case "FETCH_PLAYER":
            return action.payload;
        case "AWARD_PLAYER":
            return action.payload;
        case "CLEAR_PLAYERS":
            return [];
        default:
            return players;
    }
};

export default playersReducer;