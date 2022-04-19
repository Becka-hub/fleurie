import React, { useEffect, useState } from 'react';
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import '../css/commande.css';
import { AfficheCommande, DeleteCommande } from '../api/CommandeRequest';
import { useSelector } from 'react-redux';
import Loader from '../component/Loader';
import { toast } from 'react-toastify';

const Commandes = () => {

  const [commande, setCommande] = useState([]);
  const [loading,setLoading]=useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    getCommandes();
  },[]);
 
  const getCommandes = () => {
    setLoading(true)
    AfficheCommande(user.id).then(function (response) {
      setCommande(response.data.donner);
      setLoading(false);
    }).catch(function (error) {
      console.log(error);
    });
  }
  const handleDelete=(id)=>{
    setLoading(true)
    DeleteCommande(id).then(function (response) {
      toast.success(response.data.message);
      getCommandes();
    }).catch(function (error) {
      console.log(error);
      if(error){
         toast.error(error.response.data.message);
      }
    }).finally(function () {
      setLoading(false);
    });
  }

  const format=(datet)=>{
    let date=new Date(datet);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}h: ${date.getMinutes()}min: ${date.getSeconds()}s`;
  }
 

  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <section className='Commande'>
        {loading && <Loader/>}
        <div className='container'>
          {commande.length===0?
          <div className='commande_vide bg-light rounded-2 p-2'>
            <h4 className='text-center'>Vous n'avez pas encore fait un achat...!!!</h4>
          </div>:
          commande.map((commande) => {
            return (
              <div className='bloc_commande mt-3' key={commande.id}>
                <div className='header_commande'>
                  <h6>Achats du : {format(commande.createdAt)}</h6>
                  <button className='btn' onClick={()=>handleDelete(commande.id)}><i className='fa fa-trash-o'></i></button>
                </div>
                <div className='body_commande mt-2'>
                  <div className='row'>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
                      <div>Nom : {commande.nom}</div>
                      <div>Prenom : {commande.prenom}</div>
                      <div>Téléphone : {commande.telephone}</div>
                      <div>Adresse Livraison : {commande.adresseLivraison}</div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
                      <div>Achats : {commande.achat}</div>
                      <div className='d-flex justify-content-center'>
                        <div className='prixTotal'>
                        ${commande.prixTotal}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
          }
          {}

        </div>
      </section>
    </motion.div>
  )
}

export default Commandes