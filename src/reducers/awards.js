const awardsReducer = (awards = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_AWARDS":
            return action.payload;
        case "CREATE_AWARD":
            return action.payload;
        case "CLEAR_AWARDS":
            return [];
        default:
            return awards;
    }
};

export default awardsReducer;