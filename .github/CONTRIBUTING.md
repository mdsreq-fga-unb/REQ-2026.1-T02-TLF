# 🤝 Guia de Contribuição

Este documento concentra o conteúdo operacional para colaborar no projeto.

## Estrutura do monorepo

```text
REQ-2026.1-T02-TLF/
├── apps/
│   ├── backend/          # NestJS + Prisma + PostgreSQL
│   └── mobile/           # React Native + Expo + WatermelonDB
├── package.json          # Turborepo (orquestração)
└── .eslintrc.js          # ESLint compartilhado
```

## Pré-requisitos

| Ferramenta       | Versão mínima    | Para que serve          |
| ---------------- | ---------------- | ----------------------- |
| Node.js          | 20               | Rodar backend e tooling |
| npm              | 10               | Gerenciador de pacotes  |
| Docker + Compose | qualquer recente | Banco de dados local    |
| EAS CLI          | 12+              | Build do app mobile     |
| Android Studio   | qualquer recente | Emulador Android        |
| Xcode            | 15+              | Emulador iOS (só Mac)   |

## Setup inicial (primeira vez)

### 1) Clone e instale dependências

```bash
git clone <repo-url>
cd <pasta-do-repositorio>
npm install
```

### 2) Configure variáveis de ambiente

```bash
cp apps/backend/env/.env.example apps/backend/env/.env
cp apps/mobile/env/.env.example apps/mobile/.env
```

Preencha o `apps/backend/env/.env`:
Preencha o `apps/mobile/.env`:

Depois gere o Prisma Client:

```bash
cd apps/backend && npm run db:generate
```

### 3) Suba banco e migrations

```bash
cd apps/backend
docker compose up -d
npm run db:migrate
```

### 4) Suba backend e mobile

```bash
# backend
cd apps/backend && npm run dev

# mobile (primeira vez, instala Dev Client)
cd apps/mobile && npx expo run:android
# ou: npx expo run:ios
```

No dia a dia do mobile:

```bash
cd apps/mobile && npm run dev
```

## Arquitetura (visão rápida)

### Backend

```text
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

```text
Screen (só TSX, usa hooks e components)
    ↓
Hook (lógica da tela, estado local)
    ↓
Service (DatabaseService ou ApiService)
    ↓
WatermelonDB (local) <-> Sync <-> Backend
```

O Zustand gerencia apenas estado global. Estado de tela fica nos hooks locais.

## Fluxos do produto

### Offline-first

```text
Ação do usuário (ex: nova transação)
        ↓
WatermelonDB (SQLite local)
  - Salva imediatamente
  - UI atualiza na hora (sem esperar rede)
        ↓
Sync Engine (background)
  - Detecta registros pendentes
  - Envia para backend via POST /sync/push
  - Recebe atualizações via GET /sync/pull
        ↓
NestJS Backend
        ↓
PostgreSQL
```

### Primeiro uso (onboarding técnico)

```text
1. Abre o app pela primeira vez
2. Tela de registro (email, senha, nome)
3. Backend cria usuário no Supabase Auth
   + espelha em users no Postgres
   + cria categorias padrão
4. Backend retorna accessToken + refreshToken
5. Mobile salva tokens no SecureStore
6. Zustand marca isAuthenticated: true
7. App redireciona para Home
8. Sync inicial puxa dados para o WatermelonDB
```

### Autenticação

```text
Login
  Mobile -> POST /auth/login { email, password }
  Backend -> Supabase valida credenciais
  Backend -> retorna { accessToken, refreshToken }
  Mobile -> salva no SecureStore

Requests autenticados
  Axios interceptor injeta bearer token a cada requisição

Token expirado (após X horas)
  Request retorna 401
  Axios interceptor chama POST /auth/refresh
  Backend -> Supabase emite novo accessToken
  Axios retenta o request original

Logout
  Mobile remove tokens do SecureStore
  Backend invalida sessão no Supabase
  App redireciona para login
```

## Build do app mobile (EAS)

O app usa EAS Build para gerar binários. Como usa código nativo (WatermelonDB), o Expo Go não atende este projeto.

```bash
cd apps/mobile

# Instalação inicial
npm install -g eas-cli
eas login

# Dev Client
eas build --profile development --platform android
eas build --profile development --platform ios

# Preview
eas build --profile preview --platform android

# Produção
eas build --profile production --platform all
```

Após instalar o build de desenvolvimento no dispositivo/emulador:

```bash
npx expo start --dev-client
```

## Fluxo de branches

### 1) Sincronize com `develop`

```bash
git checkout develop
git pull origin develop
```

### 2) Crie sua branch de trabalho

Padrão: `tipo/numero-da-issue-descricao-curta`

Exemplos:

- `feat/42-tela-de-login`
- `fix/55-bug-no-botao-sair`
- `docs/12-atualizar-readme`

```bash
git checkout -b feat/42-tela-de-login
```

## Padrão de commits

Formato:

```text
<tipo>(<escopo>): <assunto>

issue associada: #<numero-da-issue>
```

Referência: [Padrões de Commits do iuricode](https://github.com/iuricode/padroes-de-commits)

Tipos mais comuns:

- `feat`: nova funcionalidade.
- `fix`: correção de bug.
- `docs`: documentação.
- `style`: formatação sem mudança de lógica.
- `refactor`: refatoração sem feature nova nem bug fix.
- `test`: inclusão/ajuste de testes.
- `chore`: manutenção de tooling/dependências.

## Comandos do dia a dia

```bash
# Raiz (backend + mobile)
npm run dev

# Backend
cd apps/backend && npm run dev

# Mobile
cd apps/mobile && npx run dev

# Prisma
cd apps/backend && npm run db:generate
cd apps/backend && npm run db:migrate
cd apps/backend && npm run db:studio

# Qualidade
npm run lint
npm run test
```

## Convenções técnicas

- Valores monetários são sempre em centavos (int).
- Todos os IDs são UUID.
- Datas usam ISO 8601 nos DTOs, `DateTime` no Prisma e `number` no WatermelonDB.
- Rotas protegidas no backend usam `@UseGuards(AuthGuard)`.
- Rotas públicas: `/auth/register`, `/auth/login` e `/auth/refresh`.

## Checklist antes de abrir PR

- Código compila e roda localmente.
- `npm run lint` sem erros.
- `npm run test` passando.
- Commits seguem o padrão definido.
- Branch criada a partir da `develop`.
