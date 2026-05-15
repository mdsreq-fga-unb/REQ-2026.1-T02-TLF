## 💻 Passo a Passo da Contribuição

Aqui está o fluxo de trabalho que usamos, do início ao fim. Siga estes passos com atenção\!

### Passo 1: Sincronize com a Branch `develop`

Antes de criar sua branch, garanta que você está com a versão mais atualizada da `develop`, que é a nossa branch principal de desenvolvimento.

```bash
# 1. Vá para a branch develop
git checkout develop

# 2. Puxe as últimas atualizações do repositório remoto
git pull origin develop
```

### Passo 2: Crie sua Branch de Trabalho

Nunca trabalhe diretamente na `develop`. Crie uma nova branch a partir dela, seguindo nosso padrão de nomenclatura.

**Padrão de Nomenclatura:** `tipo/numero-da-issue-descricao-curta`

- **tipo:** O mesmo tipo do seu primeiro commit (`feat`, `fix`, `docs`, etc.).
- **numero-da-issue:** O número da issue que você está resolvendo.
- **descricao-curta:** Duas ou três palavras que resumem a issue.

**Exemplos:**

- `feat/42-tela-de-login`
- `fix/55-bug-no-botao-sair`
- `docs/12-atualizar-readme`

**Comando para criar sua branch:**

```bash
# Troque o nome abaixo pelo da sua branch
git checkout -b feat/42-tela-de-login
```

## ✍️ Padrão de Commits

Usamos um padrão para manter nosso histórico de commits limpo e legível. A estrutura é:

```bash
<tipo>(<escopo>): <assunto>


issue associada: #<numero-da-issue>
```

- **Referência completa:** [Padrões de Commits do iuricode](https://github.com/iuricode/padroes-de-commits)

#### **Tipos mais comuns:**

- `feat`: Uma nova funcionalidade (feature).
- `fix`: Uma correção de bug.
- `docs`: Alterações na documentação.
- `style`: Formatação, ponto e vírgula, etc. (sem alteração de lógica).
- `refactor`: Refatoração de código que não corrige um bug nem adiciona uma feature.
- `test`: Adição ou correção de testes.
- `chore`: Atualização de tarefas de build, pacotes, etc.

#### **Exemplos de bons commits:**

```bash
feat(auth): implementar fluxo de login com e-mail e senha

fix(feed): corrigir crash ao carregar evento sem imagem

docs(contributing): adicionar guia de contribuição

refactor(user): mover lógica de validação para um serviço separado

test(auth): adicionar testes unitários para o serviço de autenticação
```