import React, { useState } from 'react';
import '../css/loginForm.css';
import { Login } from '../api/AuthRequest';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AjouteUser } from '../redux/action/actionAuth';


const LoginForm = ({ handleShowRegister, handleShowForgout }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const panier = useSelector((state) => state.panier);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email: email, password: password };
    Login(data).then(function (response) {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data.donner));
      localStorage.setItem('token', response.data.token);
      dispatch(AjouteUser(response.data.donner));
      if (response.data.title === "success") {
        if (panier.length === 0) {
          history.push("/paniers");
        } else {
          history.push("/payements");
        }
      }
    }).catch(function (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data.message);
      }

    }).finally(function () {
      setLoading(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loader />}
      <div className="mb-3">
        <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} placeholder='Adresse email...' required />
      </div>
      <div className="mb-2">
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe...' required />
      </div>

      <div className='d-flex justify-content-center'>
        <button type="submit" className="btn ">Connexion</button>
      </div>
      <div className="mb-3 mt-4 d-flex justify-content-start register_span">
        <span onClick={handleShowRegister}>Vous n'avez pas de compte? <strong>Inscrire</strong></span>
      </div>
    </form>

  )
}

export default LoginForm