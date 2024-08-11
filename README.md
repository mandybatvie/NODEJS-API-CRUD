# Node.js CRUD API com JWT Authentication

Esta é uma API desenvolvida em Node.js que implementa operações CRUD (Create, Read, Update, Delete) para um modelo de usuário. A API utiliza MySQL como banco de dados e implementa autenticação JWT (JSON Web Token) para proteger determinadas rotas. Este documento descreve o desenvolvimento da API, incluindo a configuração do banco de dados, variáveis de ambiente, rotas disponíveis, e como executar e testar a aplicação.


## Pré-requisitos

- Node.js v14 ou superior
- NPM (Node Package Manager)
- MySQL
- Postman ou cURL para testar a API

## Configuração do Banco de Dados

### Estrutura do Banco de Dados

Esta API utiliza MySQL como banco de dados. A tabela principal users possui os seguintes campos:

- `id` (INTEGER): Primary key, auto-incremented.
- `nome` (VARCHAR): Nome do usuário.
- `email` (VARCHAR): Email do usuário, único.
- `cpf` (VARCHAR): CPF do usuário, único.
- `tipo_cadastro` (ENUM): Tipo de registro do usuário (exemplo, "admin", "Tipo1").
- `senha` (VARCHAR): Senha do usuário, armazenada de forma criptografada.

### SQL Script to Create the `users` Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tipo_cadastro ENUM('admin', 'cliente') NOT NULL,
    senha VARCHAR(255) NOT NULL
);
```

## Configuração das Variáveis de Ambiente
Exemplo utilizado por mim no momento do desenvolvimento.
Criação de um arquivo `.env` na raiz do projeto contendo as seguintes informações:
```
DB_NAME=working
DB_USER=amanda
DB_PASS=123456
DB_HOST=localhost
JWT_SECRET=key
PORT=3000
```
## Instalação das dependências 

```
npm install express mysql2 sequelize jsonwebtoken bcryptjs body-parser dotenv

```
## Collection do Postman para a utilização dos endpoints
Arquivo: nodejs-api-crud.postman_collection.json

https://documenter.getpostman.com/view/37311722/2sA3s3JWzn

## Swagger da API
Caminho: http://localhost:3000/api-docs/


