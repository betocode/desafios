# Tecnologias Utilizadas

-- Nodejs  
-- Mysql

## Configurar arquivo .env da seguinte forma

-- SQL_ADDRESS = valor  
-- SQL_PASSWORD = valor  
-- SQL_PORT = valor  
-- SQL_DATABASE = credistar

rode o comando mysql para criar a tabela utilizada no teste  
create database credistar  
use credistar  
create table `user` (Id bigint primary key not null auto_increment,userDocument varchar(255) not null, creditCardToken varchar(255) not null,value int not null,active bool not null,updatedDate datetime null,removedDate datetime null);

## Como iniciar o projeto

Rode o comando `npm install` na pasta root do projeto para instalar as dependencias  
rode o comando `npm run prod` para inicializar a aplicação na porta 3000
