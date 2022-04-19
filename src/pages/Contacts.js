import React from 'react';
import { animationOne, transition } from '../Utils/Animation';
import { motion } from 'framer-motion';
import '../css/contact.css';
import Avatar from '../images/Beckas_avatar.jpg';
const Contacts = () => {
  return (
    <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
      <div className='Contact'>
        <div className='container'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='col-12 col-sm-6 col-md-6 col-lg-6'>
              <div className='bloc_contact'>
                <div className='d-flex justify-content-center'>
                  <div className='avatar_contact'>
                    <img src={Avatar} alt="beckas_avatar" />
                  </div>
                </div>
                <div className='description mt-2'>
                  <h6 className='text-center'>RAKOTONDRATSIMBA</h6>
                  <h6 className='text-center'>Maminiaina</h6>
                  <h6 className='text-center'>MAMINIAINAZAIN@gmail.com</h6>
                  <h6 className='text-center'>0323984415</h6>
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='merci'>
                    <i className='fa fa-thumbs-o-up'></i>
                    <h6>Merci d'avoir tester cette application demo !!!</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contacts