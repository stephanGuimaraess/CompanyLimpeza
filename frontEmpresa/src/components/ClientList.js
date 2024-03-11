import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function ClientList() {
 const [clients, setClients] = useState([]);
 const [errorMessage, setErrorMessage] = useState('');
 const [fetchData, setFetchData] = useState(false);

 const handleButtonClick = async () => {

  setFetchData(!fetchData);
  try {
    const response = await axios.get('http://localhost:5000/api/clientesList');
    setClients(response.data);
  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('Erro ao buscar clientes.');
    }
  }
};

 return (

  <div>
    <Button variant="primary" onClick={handleButtonClick}>
     {fetchData!== false ? (<div>Esconder</div>) : (<div>Listar</div>)}
    </Button>
    <ul>
    {fetchData!== false && clients.length > 0 ? (
      clients.map(cliente => (
        <li key={cliente.id}>nome : {cliente.name} - telefone : {cliente.phone} - email :{cliente.email}</li>
      ))
    ) : (
       errorMessage && <div className="error-message">{errorMessage}</div>
    )}
    </ul>
    </div>
 );
}

export default ClientList;