# 🧱 Vitrina Backend

Backend completo para o sistema **Vitrina**, uma plataforma de campanhas, pedidos e gestão de clientes, construído com:

- Node.js + Express
- PostgreSQL (via Docker)
- Prisma (ORM + migrations)
- JWT para autenticação
- Winston para logging
- TypeScript

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [Winston](https://github.com/winstonjs/winston)

---

## 📦 Como rodar localmente com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/vitrina-backend.git
cd vitrina-backend
2. Configure o .env
Crie um arquivo .env na raiz com base no exemplo:

env
Copiar
Editar
DATABASE_URL="postgresql://postgres:vitrina123@db:5432/vitrina"
JWT_SECRET="segredo-vitrina-ultra"
PORT=3000
3. Suba os containers
bash
Copiar
Editar
docker-compose up -d
4. Execute as migrations
bash
Copiar
Editar
docker exec -it vitrina-api npx prisma migrate dev --name init
🧪 Rodar localmente sem Docker
Configure o PostgreSQL local (porta 5432)

Atualize a DATABASE_URL no .env

Rode:

bash
Copiar
Editar
npm install
npx prisma migrate dev
npm run dev
🛠️ Scripts disponíveis

Comando	Ação
npm run dev	Inicia o servidor com ts-node-dev
npm run build	Compila o projeto para dist/
npm run start	Executa a versão já compilada
npm run migrate	Executa as migrations com Prisma
npm run generate	Gera os tipos e client do Prisma
npm run seed	Roda o arquivo prisma/seed.ts (seeds de dados)
📁 Estrutura do Projeto
bash
Copiar
Editar
vitrina-backend/
├── prisma/               # Migrations e schema do Prisma
├── src/
│   ├── controllers/      # Lógica dos endpoints
│   ├── routes/           # Rotas da API
│   ├── services/         # Regras de negócio
│   ├── middlewares/      # Autenticação, logs, validações
│   ├── utils/            # Helpers e utilitários
│   ├── config/           # Logger, database, env
│   ├── app.ts            # Configuração principal do Express
│   └── server.ts         # Ponto de entrada do app
├── docker-compose.yml
├── Dockerfile
├── .env
├── tsconfig.json
└── package.json
🔐 Autenticação
Autenticação baseada em JWT, com endpoints como:

POST /auth/register – cadastro de usuário

POST /auth/login – login e geração de token

GET /profile – rota protegida com token JWT

📌 Logs
Todos os logs são registrados com winston, incluindo:

Erros HTTP

Requisições

Falhas em serviços

🧠 Autor
Desenvolvido por [Fernando] 💻
Feito com foco em escalabilidade, rastreabilidade e performance.
