import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function ClientRegisterCoordenadas() {
 const [clienteId, setClienteId] = useState('');
 const [x, setX] = useState('');
 const [y, setY] = useState('');
 const [message, setMessage] = useState('');

 const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
    case 'id':
      setClienteId(value);
        break;   
    case 'x':
        setX(value);
        break;
    case 'y':
        setY(value);
        break;
    default:
        break;
    }
 };

 const handleSubmit = event => {
  setClienteId('');
  setX('');
  setY('');
  setMessage("");    
 event.preventDefault();

 if (isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
    alert('Por favor, insira números válidos para X e Y.');
    return;
 }
 const xNumber = parseFloat(x);
 const yNumber = parseFloat(y);  

 axios.post('http://localhost:5000/api/clientes/coordenadas', { clienteId, x: xNumber, y: yNumber })
     .then(() => {       
       setMessage("Coordenadas cadastradas com sucesso");
     })
     .catch(error => {
       if (error.response) {    
        setMessage("Cliente não existe");    
       } else {         
         setMessage('Erro ao cadastrar coordenadas');
       }
     });
 };

 return (
 <div className='controle-formulario'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formId">
        <Form.Label>ID do Cliente:</Form.Label>
        <Form.Control type="text" name="id" value={clienteId} onChange={handleChange} placeholder="ID do Cliente" required/>
      </Form.Group>

      <Form.Group controlId="formX">
      <Form.Label>Coordenada X</Form.Label>
      <Form.Control type="number" step="0.01" name="x" value={x} onChange={handleChange} placeholder="Coordenada X" required/>
      </Form.Group>

      <Form.Group controlId="formY">
      <Form.Label>Coordenada Y</Form.Label>
      <Form.Control type="number" step="0.01" name="y" value={y} onChange={handleChange} placeholder="Coordenada Y" required/>
      </Form.Group>

      <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
        Cadastrar coordenadas
      </Button>
      <div>{message}</div>
    </Form>
    </div>
 );
}

export default ClientRegisterCoordenadas;
