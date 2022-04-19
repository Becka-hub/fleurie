import React,{useEffect} from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Accueil from './pages/Accueil';
import Contacts from './pages/Contacts';
import Commandes from './pages/Commandes';
import Login from './pages/Login';
import Paniers from './pages/Paniers';
import Payments from './pages/Payments';
import Details from './pages/Details';

import './css/routes.css';
const Routes = () => {
  let history = useHistory();
  let location = useLocation();


  useEffect(() => {
    if (!localStorage.getItem('token') && ( location.pathname === "/payements" || location.pathname ==="/commandes")) {
        history.push('/login');
    }
}, [location.pathname,history])

useEffect(() => {
  if (localStorage.getItem('token') && (location.pathname === "/login" || location.pathname === "/reset")) {
      history.push('/payements');
  }
}, [location.pathname,history])

  return (
    <section className='section'>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Accueil} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/details/:id' component={Details} />
          <Route path='/paniers' component={Paniers} />
          <Route path='/login' component={Login} />
          <Route path='/commandes' component={Commandes} />
          <Route path='/payements' component={Payments} />
        </Switch>
      </AnimatePresence>
    </section>
  )
}

export default Routes