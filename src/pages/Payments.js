import React, { useState } from 'react'
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import '../css/payement.css';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '../Utils/Base_url';
import Loader from '../component/Loader';
import { Payement } from '../api/PayementRequest';
import { VideFleurie } from '../redux/action/actionPanier';
import { toast } from 'react-toastify';
import Image from '../images/image.png';

const Payments = () => {
  const user = useSelector((state) => state.user);
  const panier = useSelector((state) => state.panier);
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [telephone, setTelephone] = useState();
  const [adresseLivraison, setAdresseLivraison] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [achat, setAchat] = useState(
    panier.map((panier) => panier.libelle + "(" + panier.qty + ") " + panier.qty + "X" + panier.prix + "= $" + panier.qty * panier.prix + " ")
  );

  const dispatch = useDispatch();

  const totalPrix = panier.reduce((prix, item) => prix + item.qty * item.prix, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (panier.length === 0) {
      toast.warning("Votre panier est vide");
    } else {
      setLoading(true);
      const data = { achat: String(achat), prixTotal: totalPrix, nom: nom, prenom: prenom, adresseLivraison: adresseLivraison, telephone: telephone, idUser: user.id }
      Payement(data).then(function (response) {
        console.log(response);
        if (response.data.title === "success") {
          localStorage.removeItem('panier');
          dispatch(VideFleurie());
          setNom('');
          setPrenom('');
          setAdresseLivraison('');
          setTelephone('');
          setAchat('');
          setSuccess(true);
        }
        toast.success(response.data.message);

      }).catch(function (error) {
        console.log(error);
        if (error) {
          toast.warning(error.response.data.message);
        }

      }).finally(function () {
        setLoading(false);
      });
    }
  }

  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <section className='Payement'>
        {loading && <Loader />}
        {user.length !== 0 ?
          <div className='container'>
            <div className='produit_acheter'>
              <div className='d-flex justify-content-center'>
                <div className='photo_user'>
                  <img src={BASE_URL + user.photo} alt='photo_user' />
                </div>
              </div>
              <h3 className='text-center user'>{user.nom} {user.prenom}</h3>
              <h4 className='text-center'>Vous avez acheter <i className='fa fa-shopping-cart'></i></h4>
              {achat.length === 0 ? <p>Aucun...</p> : <p>{achat}</p>}
              <div className='d-flex justify-content-center'>
                <div className='prixTotal'>
                  ${totalPrix}
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              {success === true && panier.length === 0 && achat.length === 0 ?
                <div className='success_bloc bg-light pe-4 ps-4 pt-3 pb-3 mt-4'>
                  <div className='image_success'>
                    <div className='d-flex justify-content-center'>
                      <img src={Image} alt="image_success" width="100px" />
                    </div>
                    <h5 className='text-center text-uppercase'>Merci pour votre achats <i className='fa fa-smile-o' style={{ color: 'orange', fontSize: 30 }}></i></h5>
                  </div>
                </div>
                :
                <div className='payement_form col-12 col-sm-6 col-md-6 col-lg-6 '>
                  <h4 className='text-center'>Proceder à la validation de l'achats</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" value={nom} placeholder='Entrer nom...' onChange={(e) => setNom(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" value={prenom} placeholder='Entrer prenom...' onChange={(e) => setPrenom(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" value={telephone} placeholder='Entrer téléphone...' onChange={(e) => setTelephone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" value={adresseLivraison} placeholder='Entrer adresse livraison...' onChange={(e) => setAdresseLivraison(e.target.value)} required />
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button type="submit" className="btn btn-valider">Valider</button>
                    </div>
                  </form>
                </div>
              }
            </div>
          </div>
          : null}
      </section>
    </motion.div>
  )
}

export default Payments