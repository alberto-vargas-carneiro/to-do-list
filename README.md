# Projeto To-Do List Full Stack

Este projeto é uma aplicação full stack de uma lista de tarefas, onde as tarefas podem ser gerenciadas de forma eficiente e intuitiva. A aplicação foi construída utilizando tecnologias modernas e oferece funcionalidades de integração de frontend e backend, autenticação de usuário e interação com um banco de dados relacional PostgreSQL.

## Funcionalidades

- Adição e remoção de tarefas.
- Armazenamento seguro de tarefas associadas a contas de usuário.

## Tecnologias Utilizadas

- Backend: Java
- Frontend: React Typescript
- Banco de Dados: PostgreSQL

## Pré-requisitos para rodar o projeto
É necessário ter os seguintes programas instalados na máquina: (versões utilizadas nesse projeto)

- Git
- Node.js (22.15.1)
- Java (21)
- Maven (3.9.9)
- PostgreSQL (17.5)

## Depois de clonar o projeto
Frontend:

- Acessar o arquivo referente ao frontend
- Digitar "npm i" no terminal para instalar as dependências
- Digitar "npm run dev" para iniciar o programa (será executado na porta http://localhost:3000)

PostgreSQL:
- Iniciar o servidor do PostgreSQL
- Garantir que o servidor seja iniciado na porta 5432 ou então altere o arquivo application.properties na pasta do backend para corresponder a sua escolha, bem como as opções de username e password para acesso ao servidor
- Criar um banco de dados chamado "todolist_db"
  
Backend:

- Acessar o arquivo referente ao backend
- Clicar no botão da sua IDE para rodar o projeto java ou digitar "./mvnw spring-boot:run" no terminal (será executado na porta http://localhost:8080)
