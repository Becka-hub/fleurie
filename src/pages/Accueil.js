import React, { useEffect, useState } from 'react';
import { animationOne, transition } from '../Utils/Animation';
import { AnimatePresence, motion } from 'framer-motion';
import { CssBaseline } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';

import { toast } from 'react-toastify';
import { BASE_URL } from '../Utils/Base_url';
import { Link } from 'react-router-dom';

import { GetFleuriePagination, GetFleurie } from '../api/FleurieRequest';
import { GetCategory } from '../api/CategoryRequest';
import Loader from '../component/Loader';
import { Fleurie } from '../redux/action/actionFleurie';
import { AjouteFleurie } from '../redux/action/actionPanier';
import { useDispatch, useSelector } from 'react-redux';

import Image1 from '../images/fleurs1.jpg';
import '../css/accueil.css';

const Accueil = () => {

  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [fleurie, setFleurie] = useState([]);
  const [fleuriePaginate, setFleuriePaginate] = useState([]);
  const [fleuriePaginateFilter, setFleuriePaginateFilter] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [showPaginate, setShowPaginate] = useState(true);

  const dispatch = useDispatch();
  const panier = useSelector((state) => state.panier);

  useEffect(() => {
    const getCategories = () => {
      GetCategory().then(function (response) {
        setCategory(response.data.donner);
      }).catch(function (error) {
        console.log(error);
      });
    }
    getCategories();
  }, []);





  useEffect(() => {
    getFleuriePaginate();
  }, []);

  const getFleuriePaginate = (value = null) => {
    let dataPage = value === null ? page : value;
    setLoader(true);
    GetFleuriePagination(dataPage).then(function (response) {
      setFleuriePaginate(response.data.donner);
      setFleuriePaginateFilter(response.data.donner);
      setTotalPage(response.data.totalPage);
      setLoader(false);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const handlePage = (event, value) => {
    setPage(value);
    getFleuriePaginate(value);
  }




  useEffect(() => {
    const getFleurie = () => {
      GetFleurie().then(function (response) {
        setFleurie(response.data.donner);
        dispatch(Fleurie(response.data.donner));
        localStorage.setItem('fleurie', JSON.stringify(response.data.donner));
      }).catch(function (error) {
        console.log(error);
      });
    }
    getFleurie();
  }, [dispatch]);





  const handleFilter = (data) => {
    if (data === "All") {
      setFleuriePaginate(fleuriePaginateFilter);
      setShowPaginate(true);
    } else {
      let donner = fleurie.filter((fleurie) => fleurie.category.id === data);
      setFleuriePaginate(donner);
      setShowPaginate(false);
    }
  }

  const handlePanier = (data) => {
    const existe = panier.find((panier) => panier.id === data.id);
    if (existe) {
      toast.warning(`${data.libelle} existe dans le panier`);
    } else {
      dispatch(AjouteFleurie(data));
      toast.success(`${data.libelle} ajouter au panier`);
    }
  }

  return (
    <motion.div
      initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <section className='Home'>
        <div className='container'>
          <div className="background">
            <img src={Image1} alt="" />
          </div>
          <div className='d-flex justify-content-center'>
            <div className="content_home">
              <div className="title">
                <div>
                  <h1 className='text-center'>Plantons pour la planète</h1>
                  <p>
                    « Planter un arbre est un acte dont le symbolisme
                    et la signification profonde transcendent toutes
                    les cultures et sociétés du monde.
                    C’est un moyen pour les hommes, les femmes et
                    les enfants de contribuer à titre individuel à la
                    résolution de la crise environnementale. »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='Produit'>
        <div className='container'>
          <div className='d-flex justify-content-center'>
            <div className='btn_filtre'>
              <button className='btn' onClick={() => handleFilter('All')}>All</button>
              {category.map((category) => {
                return (
                  <button className='btn' onClick={() => handleFilter(category.id)} key={category.id}>{category.libelle}</button>
                );
              })}
            </div>
          </div>
          {loader && <Loader />}
          <div className='bloc_produit mt-4 '>
            <motion.div layout className='row'>
              <AnimatePresence>
                {fleuriePaginate.map((fleurie) => {
                  return (
                    <motion.div
                      layout
                      animate={{ opacity: 1, scaleY: 1 }}
                      initial={{ opacity: 0, scaleY: 0 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      className='col-12 col-sm-4 col-md-4 col-lg-4 d-flex justify-content-center' key={fleurie.id}>
                      <div className="card" style={{ width: '18rem' }}>
                        <div className='card_image'>
                          <img src={BASE_URL + fleurie.image} className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-center fw-bold">{fleurie.title}</h5>
                          <p className="card-text" align="center"><span className='dollar'>$</span>{fleurie.prix}</p>
                          <div className='button_card'>
                            <Link to={`/details/${fleurie.id}`} className="btn">Détails</Link>
                            <button className='btn' onClick={() => handlePanier(fleurie)}><i className='fa fa-shopping-cart'></i></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                )}
              </AnimatePresence>

            </motion.div>
          </div>
          {showPaginate &&
            <div className="d-flex justify-content-center mt-4 mb-3">
              <div className='pagination'>
                <CssBaseline />
                <Pagination
                  count={totalPage}
                  color="secondary"
                  onChange={handlePage}
                />
              </div>
            </div>
          }
        </div>
      </section>
    </motion.div>
  )
}

export default Accueil