import axios from "axios";
import { BASE_URL } from "../Utils/Base_url";

const AfficheCommande = async (idUser) => {
    return await axios.get(`${BASE_URL}/api/commande/${idUser}`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}

const DeleteCommande = async (idCommande) => {
     return await axios.delete(`${BASE_URL}/api/commande/${idCommande}`,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
}

export {AfficheCommande, DeleteCommande};