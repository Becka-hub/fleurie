import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const GetCategory = async () => {
    return await axios.get(`${BASE_URL}/category`)
}
export { GetCategory };