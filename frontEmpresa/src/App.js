import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate  } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientFilter from './components/ClientFilter';
import ClientRegister from './components/ClientRegister';
import ClientRegisterCoordenadas from './components/ClientRegisterCoordenadas';
import CalcRota from './components/CalcRota';
import CordinateView from './components/CordinateView';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App() {
 return (
    <Router>
      <div className="App">
      <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/client-register"><span>Client register</span></Nav.Link>                
                <Nav.Link as={Link} to="/client-filter"><span >Client Filter</span></Nav.Link>
                <Nav.Link as={Link} to="/client-list"><span>Client List</span></Nav.Link>
                <Nav.Link as={Link} to="/client-register-coordenadas"><span>Cordinate register</span></Nav.Link>
                <Nav.Link as={Link} to="/coordenate-view"><span>Cordinate view</span></Nav.Link>
                <Nav.Link as={Link} to="/calc-rota"><span>Calc Rota</span></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Navigate to="/client-register" replace />} /> 
          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/client-filter" element={<ClientFilter />} />
          <Route path="/client-list" element={<ClientList />} />
          <Route path="/client-register-coordenadas" element={<ClientRegisterCoordenadas />} />
          <Route path="/coordenate-view" element={<CordinateView />} />
          <Route path="/calc-rota" element={<CalcRota />} />
        </Routes>
      </div>
    </Router>
 );
}

export default App;