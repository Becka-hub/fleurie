import React from 'react';
import Navbars from './component/Navbars';
import Footer from './component/Footer';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbars />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
