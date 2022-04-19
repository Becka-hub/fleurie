import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const Forgout = async (data) => {
    return await axios.post(`${BASE_URL}/forgout`,data);
}

const Reset = async (token,mdp) => {
    return await axios.post(`${BASE_URL}/reset/${token}`,mdp);
}


export {Forgout,Reset};