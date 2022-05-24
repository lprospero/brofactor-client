import { combineReducers } from "redux";

import awards from "./awards";
import players from "./players";
import users from "./users";

export default combineReducers({ awards, players, users });