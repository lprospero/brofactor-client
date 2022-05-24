import axios from "axios";

const url = 'http://localhost:5000/awards';

export const getAwards = () => axios.get(url);
export const createAward = (newAward) => axios.post(url, newAward);