import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const GetFleuriePagination = async (page) => {
    return await axios.get(`${BASE_URL}/fleuriePagination/${page}`);
}

const GetFleurie=async()=>{
    return await axios.get(`${BASE_URL}/fleurie`);
}

const GetFleurieDetails = async (id) => {
    return await axios.get(`${BASE_URL}/fleurie/${id}`)
}

export { GetFleurie, GetFleurieDetails ,GetFleuriePagination};