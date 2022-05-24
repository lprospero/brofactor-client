import axios from "axios";

const url = 'http://localhost:5000/players';

export const validateUser = (user) => axios.post(`${url}/login`, user);