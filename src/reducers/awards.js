const awardsReducer = (awards = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_AWARDS":
            return action.payload;
        case "CREATE_AWARD":
            return [...awards, action.payload];
        default:
            return awards;
    }
};

export default awardsReducer;