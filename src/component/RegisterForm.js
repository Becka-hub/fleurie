import React, { useState } from 'react'
import '../css/Register.css';
import { Inscription } from '../api/AuthRequest';
import { toast } from 'react-toastify';
import Loader from './Loader';

const RegisterForm = ({ handleCloseRegister }) => {

  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [adresse, setAdresse] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [photo, setPhoto] = useState();
  const [icon, setIcon] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickPhoto = (e) => {
    var reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setPhoto(Base64);
        setIcon(false)
      };
      reader.onerror = (error) => {
        console.log('Error', error);
      };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { nom: nom, prenom: prenom, adresse: adresse, email: email, password: password, photo: photo };
    Inscription(data).then(function (response) {
      if (response.data.title === "success") {
        toast.success(response.data.message);
        handleCloseRegister();
      }
    }).catch(function (error) {
      console.log(error.response);
      toast.warning(error.response.data.message);
    }).finally(function () {
      setNom("");
      setPrenom("");
      setAdresse("");
      setEmail("");
      setPhoto("");
      setPassword("");
      setLoading(false);
    });
  }

  return (
    <div className='form_register'>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <input type="file" className="form-control" id="fileInput" required onChange={(e) => handleClickPhoto(e)} />
        <label htmlFor="fileInput" className="d-flex justify-content-center" id="fileLabel">
          <div className='avatar d-flex justify-content-center align-items-center'>
            {icon === true ?
              <i className='fa fa-user'></i> :
              <img src={photo} alt='photo_user' />
            }
          </div>
          <div className='camera'>
            <i className='fa fa-camera'></i>
          </div>
        </label>
        <div className="mb-3 mt-2">
          <label htmlFor="exampleInputNom" className="form-label">Nom</label>
          <input type="text" className="form-control" value={nom} placeholder='Entrer nom' required onChange={(e) => setNom(e.target.value)} />
        </div>
        <div className="mb-3 mt-2">
          <label htmlFor="exampleInputPrenom" className="form-label">Prenom</label>
          <input type="text" className="form-control" value={prenom} placeholder='Entrer prenom' required onChange={(e) => setPrenom(e.target.value)} />
        </div>
        <div className="mb-3 mt-2">
          <label htmlFor="exampleInputNom" className="form-label">Adresse</label>
          <input type="text" className="form-control" value={adresse} placeholder='Entrer adresse' required onChange={(e) => setAdresse(e.target.value)} />
        </div>
        <div className="mb-3 mt-2">
          <label htmlFor="exampleInputEmail1" className="form-label">Adresse email</label>
          <input type="email" className="form-control" value={email} placeholder='Entrer adresse email' required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"  className="form-label">Mot de passe</label>
          <input type="password" className="form-control" value={password} placeholder='Entrer mot de passe' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='btn btn_register d-flex justify-content-between'>
          <button className='btn_fermer' onClick={handleCloseRegister}>Fermer</button>
          <button type="submit" className="btn_inscrire ">Inscrire</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm