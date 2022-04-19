import React, { useState } from 'react'
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import LoginForm from '../component/LoginForm';
import RegisterForm from '../component/RegisterForm';
import { Modal} from 'react-bootstrap';
import '../css/login.css';
import ImageLogin from '../images/kl.jpg';

const Login = () => {

  const [showResgister, setShowResgister] = useState(false);

  const handleCloseRegister = () => setShowResgister(false);
  const handleShowRegister = () => setShowResgister(true);



  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <div className='container'>
        <section className='Login'>
          <div className='row justify-content-center'>
            <div className='col-12 col-sm-6 col-md-4 col-lg-4'>
              <div className='bloc_login'>
                <div className='d-flex justify-content-center'>
                  <div className='image_login'>
                    <img src={ImageLogin} alt='image_login' />
                  </div>
                </div>
                <LoginForm handleShowRegister={handleShowRegister}/>
              </div>
            </div>
          </div>
        </section>
        <section className='Register'>
          <Modal size="md" show={showResgister} onHide={handleCloseRegister}>
            <Modal.Body>
                <RegisterForm
                handleCloseRegister={handleCloseRegister}
                />
            </Modal.Body>
          </Modal>
        </section>
 
      </div>
    </motion.div>
  )
}

export default Login