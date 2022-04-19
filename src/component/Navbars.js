import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/navbars.css';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { suprimerUser } from '../redux/action/actionAuth';
const Navbars = () => {

  const [active, setActive] = useState(1);
  const panier = useSelector((state) => state.panier);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const handleActiver = (active) => {
    setActive(active);
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(suprimerUser());
    history.push("/");
  }
  return (
    <>
      <Navbar fixed="top" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to='/' > Shop<strong className="logo">Fleurs</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 nav_center"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className={active === 1 ? 'activer' : ''} onClick={() => handleActiver(1)} as={Link} to='/'>Accueil</Nav.Link>
              {user.length !== 0 ? <Nav.Link className={active === 3 ? 'activer' : ''} onClick={() => handleActiver(3)} as={Link} to='/commandes'>Achats</Nav.Link> : null}
              <Nav.Link className={active === 4 ? 'activer' : ''} onClick={() => handleActiver(4)} as={Link} to='/contacts'>Contacts</Nav.Link>
            </Nav>
            <Nav
              className="ms-auto my-2 my-lg-0 nav_right"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to='/paniers' onClick={() => handleActiver(5)}><i className="fa fa-shopping-cart"></i><span className="badge">{panier.length}</span></Nav.Link>
              {user.length === 0 ? <Nav.Link as={Link} to='/login' onClick={() => handleActiver(6)}><i className="fa fa-user"></i></Nav.Link> : null}
              {user.length !== 0 ? <Nav.Link className="fa-power" onClick={logout}><i className="fa fa-power-off" onClick={() => handleActiver(7)}></i></Nav.Link> : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Navbars