import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


function ClientFilter() {
 const [filteredClients, setFilteredClients] = useState([]);
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [message, setMessage] = useState('');

 const handleChange = event => {
    const {name ,value} = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
        case 'phone':
          setPhone(value);
          break;
      case 'email':
        setEmail(value);
        break;

        default:
          break;
    }
 };

 const handleSubmit = event => {
    setName('');
    setEmail('');
    setPhone('');
    setFilteredClients([]);
    setMessage('');
    event.preventDefault();
    axios.get(`http://localhost:5000/api/clientes/filtrar?name=${name.toLowerCase()}&phone=${phone}&email=${email.toLowerCase()}`)
      .then(res => {
        setFilteredClients(res.data);
      }).catch(error => {   
        if (error.response && error.response.status === 404) {          
          setMessage("Não foi possível encontrar o cliente. Por favor, verifique e tente novamente.");
        } else {          
          setMessage('Ocorreu um erro ao buscar o cliente:');
        }
        
        }
      );
 };

 return (
    <div className='container-filter'>
      <Form onSubmit={handleSubmit}>
      <Form.Group className='filtragem-cliente'>
      <Form.Control type="text" name="name" value={name} onChange={handleChange} placeholder="Nome para filtragem" required/>
      <Form.Control type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Telefone para filtragem"required/>
      <Form.Control type="text" name="email" value={email} onChange={handleChange} placeholder="Email para filtragem" required/>
      <Button variant="primary" type="submit">Filtrar</Button>
      </Form.Group>
      </Form>
      <ul>
        {filteredClients.map(cliente => (          
          <li key={cliente.id}>nome : {cliente.name} - telefone : {cliente.phone} - email :{cliente.email}</li>
        ))}
      </ul>
      <div>{message}</div>
    </div>
 );
}

export default ClientFilter;