import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const Payement = async (data) => {
    return await axios.post(`${BASE_URL}/api/commande`,data,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}

export { Payement };