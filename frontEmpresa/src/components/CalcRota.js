import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


function CalcRota() {
 const [route, setRoute] = useState([]);
 const [showModal, setShowModal] = useState(false);


 const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);



const handleCalcularRota = async () => {

   
    try {
      const response = await axios.get('http://localhost:5000/api/calcularRota');
      setRoute(response.data);
      handleOpenModal();
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error('Erro ao calcular a rota', error);
      }
    }
  };



 return (
    <div>     
     <Button variant="primary" onClick={handleCalcularRota} className='botao-calRota'>Calcular Rota</Button>

<Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
        <Modal.Title>Rota de Atendimento</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {route.map((cliente, index) => (
            <p key={index}>{cliente.name} - {cliente.email}</p>
        ))}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
        </Button>
    </Modal.Footer>
</Modal>
    </div>
 );
}

export default CalcRota;