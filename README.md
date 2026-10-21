# Sobre o FrontTube

O projeto FrontTube visa colocar em prática todo meu conhecimento adquirido com Vite e React. O projeto se baseia em tentar recriar a interface do famoso Youtube com essas ferramentas.

## Backend

Mesmo sendo um projeto com foco em Frontend, fiz um backend com **Fastify** (primeira vez também) para funcionar como um intermediário que se conecta com a API do Youtube e retornar os dados para o frontend já devidamente organizados.
Endpoints disponíveis:

- `/api/get/trending` - Retorna vídeos em alta;
- `/api/get/search` - Retorna vídeos de uma pesquisa específica.
- `/api/ping` - Testa se o Backend está no ar, retornando um `ok`

O backend mantém a `SECRET_API_KEY` da API do Google segura.

## Frontend

O frontend foi construído utilizando **React** e **Vite**, projetado como uma **Single Page Application (SPA)**. Isso significa que a navegação entre as telas acontecem sem atualizar a página inteira, dando uma navegação mais fluida.

**Destaques técnicos do Frontend:**
- **React Router:** Gerenciamento de rotas fluído;
- **Componentização:** Criação de componentes reutilizáveis e inteligentes;
- **Design Responsivo:** Utilização de CSS Grid e Media Queries avançadas para replicar o comportamento da grade do YouTube e rolagem infinita;
- **Consumo de API:** Sistema de buffer de vídeos para otimizar o consumo da API do Youtube, enviando menos solicitações e renderizando vídeos já no estoque.

## Como inicializar localmente

Você pode acessar o projeto rodando na nuvem em [https://fronttube-react.vercel.app/](https://fronttube-react.vercel.app/).

Mas você também pode instalar em sua máquina, utilizar sua própria chave e visualizar o projeto. Com o **Node.JS** instalado, é necessário apenas seguir os passos abaixo para rodar as duas partes do projeto (Frontend e Backend):

### 1. Configurando o Backend
Abra o terminal, entre na pasta do backend e instale as dependências:
```bash
cd backend
npm install
```
Crie um arquivo chamado `.env` na raiz da pasta `backend` e adicione a sua chave da API do YouTube (v3):
```env
SECRET_API_KEY=sua_chave_aqui
```
Inicie o servidor (ele rodará na porta 3000):
```bash
node app.js
```

### 2. Configurando o Frontend
Abra um **novo** terminal (mantenha o backend rodando), entre na pasta do frontend e instale as dependências:
```bash
cd frontend
npm install
```
Inicie o servidor do Vite:
```bash
npm run dev
```

Pronto! Agora é só abrir o link escrito no terminal (configurado como `http://localhost:5173`) no seu navegador e testar por conta própria.
