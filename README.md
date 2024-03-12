# Sistema de Gerenciamento de Clientes


Clonar o Repositório:
Primeiro, você precisa clonar o repositório para a sua máquina local. Isso pode ser feito com o comando git clone, seguido pelo URL do repositório: https://github.com/stephanGuimaraess/company


## Instalação
isntale as dependencias com npm install ou yarn install.

iniciar front : npm start
iniciar back :  node server.js

## Tecnologias Utilizadas
- **Node**: v20.11.1
- **React**: "^18.2.0"

## Banco de dados Postgree comando sql

CREATE SCHEMA IF NOT EXISTS clientes;

CREATE TABLE clientes.cliente (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE clientes.coordenadas (
    cliente_id INTEGER REFERENCES clientes.cliente(id),
    coordenadaX DOUBLE PRECISION,
    coordenadaY DOUBLE PRECISION,
    PRIMARY KEY (cliente_id)
); >>>>obs : talvez a coluna coordenadaX e coordenadaY mesmo estando maiuscula o X  e Y na criaçao fique minusculo, é preciso alterar manual pelo painel para maiusculo ... pgadmin4
