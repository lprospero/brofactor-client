const usersReducer = (users = [], action) => {
    switch (action.type) {
        case "VALIDATE_USER":
            return action.payload;
        default:
            return users;
    }
};

export default usersReducer;