import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


function CordinateView() {
 const [filteredClients, setFilteredClients] = useState([]);
 const [clienteId, setClienteId] = useState('');
 const [message, setMessage] = useState('');


  const handleChange = event => {
    const {value} = event.target;
    setClienteId(value)
    }


 const handleSubmit = event => {
    setMessage('');
    setFilteredClients([]);
    event.preventDefault();
    axios.get(`http://localhost:5000/api/coordenadas/filtrar?clienteId=${clienteId}`)
      .then(res => {
        setFilteredClients(res.data);
      })
      .catch(error => {
        
        if (error.response && error.response.status === 404) {
          
          setMessage('Não foi possível encontrar o cliente com o ID fornecido. Por favor, verifique o ID e tente novamente.');
        } else {
          
          setMessage('Ocorreu um erro ao buscar as coordenadas do cliente:');
        }
      });
 };

 return (
    <div className='container-filter'>
      <Form onSubmit={handleSubmit} style={{marginTop:"10px"}}>
      <Form.Group className='filtragem-cliente'>
      <Form.Control type="number" name="name" value={clienteId} onChange={handleChange} placeholder="Id do cliente" required/>
      <Button variant="primary" type="submit" style={{marginLeft:"10px"}}>Filtrar coordenada</Button>
      </Form.Group>
      </Form>
      <ul>
        {filteredClients.map((cliente,key) => (          
          <li key={key}>id cliente: {cliente.cliente_id} X: {cliente.coordenadaX} Y : {cliente.coordenadaX}</li>
        ))}
      </ul>
      <div>{message}</div>
    </div>
 );

};
export default CordinateView;