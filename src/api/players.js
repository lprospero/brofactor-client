import axios from "axios";

const url = 'http://localhost:5000/players';

export const getPlayers = () => axios.get(url);
export const createPlayer = (newPlayer) => axios.post(url, newPlayer);
export const getPlayer = (id) => axios.get(`${url}/id=${id}`);
export const awardPlayer = (sponsorship) => axios.patch(`${url}/${sponsorship.player}/award`, sponsorship);