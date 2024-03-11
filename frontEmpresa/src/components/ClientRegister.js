import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


function ClientForm() {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [message, setMessage] = useState('');


 const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'nome':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
       setPhone(value);
        break;
      default:
        break;
    }
 };


 const handleSubmit = event => {  
  setName('');
  setEmail('');
  setPhone('');
  event.preventDefault();  

  axios.post('http://localhost:5000/api/clientes', { name, email, phone})
     .then(() => {       
       setMessage("Cliente cadastrado com sucesso");  
      
     })
     .catch(error => {
       if (error.response) {         
        setMessage("Cliente já possue cadastro no sistema");
        
       } else {         
         setMessage('Erro ao cadastrar cliente.');
       }
     });
 };

 return (
  <div className='controle-formulario'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" value={name} onChange={handleChange} placeholder="Nome" required />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required/>
      </Form.Group>

      <Form.Group controlId="formTelefone">
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Telefone" required/>
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
        Cadastrar
      </Button>
      <div>{message}</div>
    </Form>
    </div>
 );
}

export default ClientForm;