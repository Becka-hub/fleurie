import React from 'react';
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import '../css/panier.css';
import { useSelector, useDispatch } from 'react-redux';
import { AjouteFleurie, SuprimerFleurie } from '../redux/action/actionPanier';
import { BASE_URL } from '../Utils/Base_url';
import { Link } from 'react-router-dom';

const Paniers = () => {

  const panier = useSelector((state) => state.panier);
  const dispatch = useDispatch();
  const totalPrix = panier.reduce((prix, item) => prix + item.qty * item.prix, 0);

  const handleAddPanier = (data) => {
    dispatch(AjouteFleurie(data));
  }
  const handleDeletePanier = (data) => {
    dispatch(SuprimerFleurie(data));
  }
  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <div className='container'>
        <section className='panier'>
          <div className='panier_titre'>
            <h4>Votre panier <i className='fa fa-shopping-cart'></i></h4>
            <p>{panier.length} produits</p>
          </div>
          <hr />
          {panier.length === 0 ?
            <h4 className='text-center'>Panier vide</h4> :
            panier.map((panier) => {
              return (
                <div className='panier_produit mt-2' key={panier.id}>
                  <div className='row'>
                    <div className='col-4 col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center'>
                      <div className='produit_image'>
                        <img src={BASE_URL + panier.image} alt="photo_produit" />
                      </div>
                    </div>
                    <div className='col-4 col-sm-2 col-md-2 col-lg-2'>
                      <div className='produit_libelle'>
                        <h4 >{panier.libelle}</h4>
                      </div>
                    </div>
                    <div className='col-4 col-sm-2 col-md-2 col-lg-2 '>
                      <div className='produit_prix'>
                        <h4>${panier.prix}</h4>
                      </div>
                    </div>
                    <div className='col-12 col-sm-6 col-md-6 col-lg-6 d-flex'>
                      <div className='quantite'>
                        <button className='btn btn_plus me-4' onClick={() => handleAddPanier(panier)}>+</button>
                        <span className='qty'>{panier.qty}</span>
                        <button className='btn btn_moins ms-4' onClick={() => handleDeletePanier(panier)}>-</button>
                      </div>
                      <div className='produit_calcule d-flex justify-content-end'>
                        <h4>{panier.qty} x {panier.prix} = ${panier.qty * panier.prix}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }

          <hr />
          <div className='panier_validation'>
            <div className='totalprix'>
              <h5>Totals prix = </h5>
              <div className='total'>${totalPrix}</div>
            </div>
            {panier.length!==0?
            <Link to='/payements' className='btn btn_valider text-uppercase'>Payements</Link>
            :null
            }
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default Paniers