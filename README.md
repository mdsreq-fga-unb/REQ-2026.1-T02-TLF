# 💰 TLT Finanças

<p align="center">
  <img src="https://via.placeholder.com/900x250.png?text=TLT+Finan%C3%A7as" alt="TLT Finanças Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" />
  <img src="https://img.shields.io/badge/version-0.1.0-blue" />
  <img src="https://img.shields.io/badge/license-academic-lightgrey" />
  <img src="https://img.shields.io/badge/node-%3E%3D18-green" />
</p>

---

## 🌐 Documentação Oficial

Nosso portal de documentação, está disponível em: 👉 https://mdsreq-fga-unb.github.io/REQ-2026.1-T02-TLF/

---

## 📌 Sobre o projeto

O **TLT Finanças** é uma plataforma de gestão financeira pessoal criada para ajudar usuários a organizarem suas finanças de forma simples, intuitiva e acessível.

O projeto tem foco em pessoas que enfrentam dificuldades com controle financeiro, oferecendo uma alternativa às planilhas complexas e ferramentas pouco acessíveis.

---

## 🚀 Funcionalidades

- 📊 Painel financeiro consolidado
- 💸 Registro de receitas e despesas
- 📅 Planejamento mensal
- 📈 Relatórios e gráficos
- 📱 Interface mobile intuitiva
- 🔄 Sincronização e uso offline
- 🔐 Segurança de dados
- 📚 Educação financeira integrada

---

## 🧠 Problema abordado

Muitos usuários enfrentam:

- dificuldade em controlar gastos;
- alto nível de endividamento;
- falta de visibilidade do orçamento;
- baixa educação financeira.

O TLT Finanças surge como uma solução simples e acessível para esse cenário.

---

## 💡 Solução

Uma aplicação que centraliza o controle financeiro do usuário, permitindo:

- visualizar saldo e fluxo de caixa;
- registrar transações facilmente;
- acompanhar metas financeiras;
- analisar dados através de gráficos;
- tomar decisões mais conscientes.

---

## 🛠️ Tecnologias

### Frontend

- React Native (Expo)
- Victory Native

### Backend

- Node.js
- NestJS
- PostgreSQL
- Prisma

### Outros

- Supabase Auth
- Jest
- Swagger
- GitHub

---

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node.js (>= 18)
- npm ou yarn
- Expo CLI

### 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tlt-financas.git

# Acesse o projeto
cd tlt-financas
```

### ▶️ Rodando o frontend (mobile)

```bash
🚧 Em desenvolvimento
```

### ▶️ Rodando o backend

```bash
🚧 Em desenvolvimento
```

---

## 📅 Cronograma

O projeto foi dividido em **13 iterações**:

- 🧱 Concepção e planejamento
- ⚙️ Desenvolvimento das funcionalidades principais
- 📱 Interface mobile
- 🔐 Segurança e dados
- 🧪 Testes e validação
- 🚀 Entrega do MVP

---

## 👥 Equipe

| Nome              | Função                      |
| ----------------- | --------------------------- |
| Gabriel Mota      | Gerente de Projeto / DevOps |
| Lucas Fujimoto    | Frontend                    |
| Guilherme Ventura | Frontend                    |
| Danilo de Melo    | Backend                     |
| Daniel Lira       | Backend / Requisitos        |
| Tiago Lyra        | Backend                     |

---

## 📌 Status do projeto

🚧 Em desenvolvimento — MVP em construção

---

## 📄 Licença

Projeto acadêmico sem fins comerciais.

---

## 🌐 Deploy

A aplicação pode ser publicada via **GitHub Pages** para a landing page.

---

# tlt — Monorepo

Stack de gestão financeira pessoal com backend NestJS e app mobile React Native.

## Estrutura do repositório

```
tlt/
├── apps/
│   ├── backend/          → NestJS + Prisma + PostgreSQL
│   └── mobile/           → React Native + Expo + WatermelonDB
├── package.json          → Turborepo (orquestrador do monorepo)
├── turbo.json            → Configuração de tasks paralelas
├── .eslintrc.js          → ESLint compartilhado entre os dois apps
└── .prettierrc           → Prettier compartilhado
```

### Por que monorepo?

Um único `npm install` na raiz instala as dependências dos dois projetos. Lint, testes e build rodam em paralelo com um único comando via Turborepo. Colegas novos clonam o repo e sobem tudo com poucos passos.

Cada app tem seu próprio `package.json` com suas dependências — o monorepo só orquestra, não mistura.

---

## Pré-requisitos

| Ferramenta       | Versão mínima    | Para que serve          |
| ---------------- | ---------------- | ----------------------- |
| Node.js          | 20               | Rodar backend e tooling |
| npm              | 10               | Gerenciador de pacotes  |
| Docker + Compose | qualquer recente | Banco de dados local    |
| EAS CLI          | 12+              | Build do app mobile     |
| Android Studio   | qualquer recente | Emulador Android        |
| Xcode            | 15+              | Emulador iOS (só Mac)   |

---

## Setup inicial — faça isso uma vez

### 1. Clone e instale tudo

```bash
git clone <repo-url>
cd tlt
npm install
```

O `postinstall` do backend roda `prisma generate` automaticamente — o PrismaClient já estará disponível após o install.

### 2. Configure as variáveis de ambiente

```bash
cp apps/backend/env/.env.example apps/backend/env/.env
cp apps/mobile/.env.example apps/mobile/.env
```

Preencha os valores no `apps/backend/env/.env`:

| Variável               | Onde encontrar                                               |
| ---------------------- | ------------------------------------------------------------ |
| `DATABASE_URL`         | Monta com as credenciais do Postgres local                   |
| `SUPABASE_URL`         | Supabase Dashboard → Project Settings → API                  |
| `SUPABASE_JWT_SECRET`  | Supabase Dashboard → Settings → JWT Keys → Legacy JWT Secret |
| `SUPABASE_SERVICE_KEY` | Supabase Dashboard → Settings → API → Secret keys            |

Preencha o `apps/mobile/.env`:

| Variável              | Valor em desenvolvimento          |
| --------------------- | --------------------------------- |
| `EXPO_PUBLIC_API_URL` | `http://SEU_IP_LOCAL:3000/api/v1` |

> **Atenção:** use o IP da sua máquina na rede local, não `localhost`.
> Para descobrir: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux).
> `localhost` no celular aponta para o próprio celular, não para o seu computador.

### 3. Suba o banco de dados

```bash
cd apps/backend
docker compose up -d

# Confirma que subiu
docker compose ps
```

### 4. Rode as migrations

```bash
# Ainda dentro de apps/backend
npm run db:migrate
```

Isso cria todas as tabelas no banco e gera o PrismaClient tipado.

### 5. Suba o backend

```bash
npm run dev
# API disponível em http://localhost:3000/api/v1
# Swagger em     http://localhost:3000/api/v1/docs
```

### 6. Configure o mobile (primeira vez)

```bash
cd apps/mobile

# Instala o Dev Client no emulador Android
npx expo run:android

# ou iOS (só no Mac)
npx expo run:ios
```

Isso faz o prebuild, compila o código nativo e instala o Dev Client no emulador. Precisa fazer isso apenas quando:

- É a primeira vez no projeto
- Uma nova biblioteca nativa foi adicionada
- A versão do Expo foi atualizada

Para os dias seguintes, apenas:

```bash
npx expo start --dev-client
```

---

## Fluxo offline-first

O app é **offline-first** — toda ação do usuário é salva localmente primeiro e sincronizada com o servidor depois.

```
Ação do usuário (ex: nova transação)
        ↓
WatermelonDB (SQLite local)
  - Salva imediatamente
  - UI atualiza na hora — sem esperar rede
        ↓
Sync Engine (background)
  - Detecta registros pendentes
  - Envia para o backend via POST /sync/push
  - Recebe atualizações do servidor via GET /sync/pull
        ↓
NestJS Backend
        ↓
PostgreSQL
```

**O usuário nunca espera a rede para ver o resultado de uma ação.**
Se estiver sem internet, os dados ficam no WatermelonDB até a conexão voltar.

---

## Fluxo de primeiro uso

```
1. Abre o app pela primeira vez
        ↓
2. Tela de registro (email, senha, nome)
        ↓
3. Backend cria usuário no Supabase Auth
   + espelha na tabela users do Postgres
   + cria categorias padrão vinculadas ao usuário
        ↓
4. Backend retorna accessToken + refreshToken
        ↓
5. Mobile salva tokens no SecureStore (keychain do SO)
        ↓
6. Zustand marca isAuthenticated: true
        ↓
7. App redireciona para a Home
        ↓
8. Sync inicial: puxa dados do servidor para o WatermelonDB
        ↓
9. App pronto para uso — funciona offline a partir daqui
```

---

## Fluxo de autenticação

```
Login
  Mobile → POST /auth/login { email, password }
  Backend → Supabase valida credenciais
  Backend → retorna { accessToken, refreshToken }
  Mobile → salva no SecureStore

Requests autenticados
  Axios interceptor injeta automaticamente:
  Authorization: Bearer <accessToken>

Token expirado (após 1 hora)
  Request retorna 401
  Axios interceptor chama POST /auth/refresh
  Backend → Supabase emite novo accessToken
  Axios retenta o request original
  Usuário não percebe nada

Logout
  Mobile deleta tokens do SecureStore
  Backend invalida sessão no Supabase
  App redireciona para login
```

---

## Comandos do dia a dia

```bash
# Raiz — roda backend e mobile juntos
turbo dev

# Só o backend
cd apps/backend && npm run dev

# Só o mobile
cd apps/mobile && npx expo start --dev-client

# Nova migration após alterar o schema.prisma
cd apps/backend && npm run db:migrate

# Visualizar o banco graficamente
cd apps/backend && npm run db:studio

# Lint em tudo
turbo lint

# Testes em tudo
turbo test
```

---

## Build do app mobile

O app usa **EAS Build** para gerar os binários. O código nativo (WatermelonDB) exige um build real — o Expo Go não funciona neste projeto.

```bash
# Instala o EAS CLI (só uma vez)
npm install -g eas-cli
eas login

# Dev Client — Android (para desenvolvimento)
eas build --profile development --platform android

# Dev Client — iOS (para desenvolvimento, só Mac ou com conta Apple)
eas build --profile development --platform ios

# Simulador iOS (sem conta Apple)
eas build --profile development:simulator --platform ios

# Preview — testar versão de produção antes de publicar
eas build --profile preview --platform android

# Produção — build final para a store
eas build --profile production --platform all
```

Após o build de desenvolvimento, instale o `.apk` gerado no celular/emulador. A partir daí, para atualizar o app durante o desenvolvimento:

```bash
npx expo start --dev-client
# Escaneia o QR com o Dev Client instalado (não o Expo Go)
```

---

## Variáveis de ambiente — resumo completo

### Backend (`apps/backend/env/.env`)

```bash
# Banco de dados
POSTGRES_USER=tlt
POSTGRES_PASSWORD=tlt_dev
POSTGRES_DB=tlt_db
DATABASE_URL="postgresql://tlt:tlt_dev@localhost:5432/tlt_db?schema=public"

# App
NODE_ENV=development
PORT=3000

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_JWT_SECRET=seu-legacy-jwt-secret
SUPABASE_SERVICE_KEY=sb_secret_...
```

### Mobile (`apps/mobile/.env`)

```bash
# Use o IP da sua máquina, não localhost
EXPO_PUBLIC_API_URL=http://192.168.1.X:3000/api/v1
```

---

## Convenções do projeto

- **Valores monetários** são sempre **centavos (int)**. `R$500,00 = 50000`. A conversão para exibição acontece na camada de apresentação com o utilitário `fromCents()`.
- **Todos os IDs** são UUID.
- **Datas** são ISO 8601 nos DTOs, `DateTime` no Prisma e `number` (timestamp) no WatermelonDB.
- **Rotas protegidas** no backend usam `@UseGuards(AuthGuard)` no controller. Rotas públicas são apenas `/auth/register`, `/auth/login` e `/auth/refresh`.
- **Commits** seguem Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`.

---

## Arquitetura

### Backend

```
Request HTTP
    ↓
DTO (valida, tipifica e documenta via Swagger)
    ↓
Controller (recebe HTTP, chama Service)
    ↓
Service (regras de negócio, chama Prisma)
    ↓
Prisma ORM
    ↓
PostgreSQL
```

### Mobile

```
Screen (só TSX, usa hooks e components)
    ↓
Hook (lógica da tela, estado local)
    ↓
Service (DatabaseService ou ApiService)
    ↓
WatermelonDB (local) ←→ Sync ←→ Backend
```

**Zustand** gerencia apenas estado verdadeiramente global: autenticação (`useAuthStore`) e tema (`useThemeStore`). Estado de tela fica nos hooks locais.
