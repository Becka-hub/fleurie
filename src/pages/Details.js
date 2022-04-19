import React, { useEffect, useState } from 'react';
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import '../css/details.css';
import { Link, useParams, useHistory } from 'react-router-dom';
import { GetFleurieDetails } from '../api/FleurieRequest';
import Loader from '../component/Loader';
import { BASE_URL } from '../Utils/Base_url';
import { useDispatch, useSelector } from 'react-redux';
import { AjouteFleurie } from '../redux/action/actionPanier';

const Details = () => {

  const [loading, setLoading] = useState(false);
  const [fleurie, setFleurie] = useState([]);

  const history = useHistory();
  const { id } = useParams();
  const dataFleurie = useSelector((state) => state.fleurie);
  const dispatch = useDispatch();
  const panier = useSelector((state) => state.panier);

  const existe = dataFleurie.find((x) => x.id === parseInt(id));

  useEffect(() => {
   if(!existe){
     history.push('/');
   }
  }, [existe,history]);


  useEffect(() => {
    const getFleurie = () => {
      setLoading(true)
      GetFleurieDetails(id).then(function (response) {
        setFleurie(response.data.donner);
        setLoading(false);
      }).catch(function (error) {
        console.log(error);
      });
    }
    getFleurie();
  }, [id])

const handlePanier=(data)=>{
  const existe=panier.find((panier)=>panier.id===data.id);
  if(existe){
    toast.warning(`${data.libelle} existe dans le panier`);
  }else{
     dispatch(AjouteFleurie(data));
     toast.success(`${data.libelle} ajouter au panier`);
  } 
}

  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      {loading && <Loader />}
      <section className='Details'>
        <div className='container'>

          <div className='bloc_details'>
            <h2>Fleurs détails </h2>
            {!loading &&
              <div className='row'>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
                  <div className='image_details'>
                    <img src={BASE_URL + fleurie.image} alt='photo_details' />
                  </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
                  <div className='produit'>
                    <h4>{fleurie.libelle}</h4>
                    <p>{fleurie.description}</p>
                    <div className='prix'>
                      <h5 className='text-center'>${fleurie.prix}</h5>
                    </div>
                    <div className='d-flex justify-content-between mt-5'>
                      <Link to='/' className='btn btn_accueils'>Accueil</Link>
                      <button className='btn btn_panier' onClick={()=>handlePanier(fleurie)}>Ajouter au panier <i className='fa fa-shopping-cart'></i></button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>


        </div>
      </section>
    </motion.div>
  )
}

export default Details