# Explicação das tabelas

**User** — o dono de tudo. Cada dado no app pertence a um usuário. A autenticação é delegada ao Supabase, então aqui ficam só os dados de perfil.

**Institution** — o banco ou carteira que o usuário cadastra. Nubank, Itaú e "Carteira" são instituições. Pertence ao usuário porque cada um cadastra as suas.

**Account** — onde o dinheiro vive dentro de uma instituição. Uma conta corrente, uma poupança ou um cartão de crédito. O `type` define o comportamento: só contas do tipo `CREDIT_CARD` geram `Recurrence`. Os campos `closing_day` e `due_day` só fazem sentido para cartão e ficam `null` para os outros tipos.

**Category** e **Subcategory** — classificação livre do usuário. São criadas no onboarding com defaults, mas totalmente editáveis. `Category` não tem `type`; quem diz se é despesa ou receita é a `Transaction`.

**Budget** — limite mensal por categoria. A combinação `(user_id, category_id, month, year)` é única. Isso permite rastrear, por exemplo, “em janeiro gastei 80% do meu orçamento de alimentação” e comparar com fevereiro.

**Recurrence** — a regra de uma transação que se repete. Netflix todo dia 18, aluguel todo dia 5. Ela não é uma transação: ela gera transações. No MVP, o app pergunta ao usuário “a Netflix foi debitada esse mês?” e cria a `Transaction` com `recurrence_id` apontando para cá. O histórico fica rastreável.

**Transaction** — o coração do app. Registra todo movimento financeiro. Os campos nullable são as portas abertas: `recurrence_id` só para recorrências, `destination_account_id` só para transferências, `installment_ref`/`number`/`total` só para parceladas.

## Funcionalidades do app

### Gestão de contas e instituições

O usuário cadastra suas instituições financeiras e, dentro de cada uma, suas contas — corrente, poupança, cartão de crédito ou dinheiro em espécie. O saldo consolidado de todas as contas é visível na home, assim como o saldo individual de cada uma.

### Registro de transações

Qualquer movimentação financeira é uma transação: despesa, receita ou transferência entre contas. O usuário informa valor, data, categoria, subcategoria e conta. Para cartão de crédito, a transação é automaticamente vinculada à fatura aberta do mês corrente.

### Compras parceladas

Ao registrar uma compra parcelada, por exemplo R$ 3.000 em 10x, o app cria 10 transações vinculadas por um `installment_ref` comum, cada uma apontando para a fatura do mês correspondente. Na tela de fatura de cada mês aparece a parcela correta, como “3/10” e “4/10”.

### Transferências entre contas

O usuário registra uma transferência informando conta de origem e conta de destino. O saldo das duas é atualizado. O pagamento da fatura do cartão funciona exatamente assim: é uma transferência da conta corrente para o cartão, que atualiza o `paid_amount` da fatura.

### Fatura do cartão de crédito

Cada cartão tem um ciclo de fechamento e vencimento. O app exibe a fatura aberta, o total da fatura e o valor já pago. O status da fatura (`OPEN` → `CLOSED` → `PARTIALLY_PAID` → `PAID`) acompanha os pagamentos registrados.

### Recorrências

O usuário cadastra gastos fixos mensais informando valor, dia do mês, conta e categoria. No dia configurado, o app notifica e pergunta se o débito ocorreu. Com a confirmação, a transação é criada com vínculo à recorrência, mantendo o histórico de todas as ocorrências.

### Orçamentos por categoria

O usuário define um teto de gastos mensal por categoria. O app acompanha o percentual consumido em tempo real. O histórico de orçamentos por mês permite comparar a evolução ao longo do tempo.

### Dashboard e estatísticas

Visão consolidada do saldo total, gastos por categoria com gráfico de rosca, comparativo receita versus despesa e histórico temporal.

## Tabela de referência completa

### User

| Campo | Tipo    | Descrição                      |
| ----- | ------- | ------------------------------ |
| id    | uuid PK | Identificador único            |
| name  | string  | Nome do usuário                |
| email | string  | Email (vindo do Supabase Auth) |

### Institution

| Campo    | Tipo    | Descrição                         |
| -------- | ------- | --------------------------------- |
| id       | uuid PK | —                                 |
| user_id  | uuid FK | Dono da instituição               |
| name     | string  | Ex.: "Nubank", "Itaú", "Carteira" |
| logo_url | string? | Para exibir o ícone do banco      |

### Account

| Campo          | Tipo    | Descrição                                    |
| -------------- | ------- | -------------------------------------------- |
| id             | uuid PK | —                                            |
| institution_id | uuid FK | Banco ao qual pertence                       |
| name           | string  | Ex.: "Nubank Crédito", "Conta Corrente"      |
| type           | enum    | `CHECKING`, `SAVINGS`, `CREDIT_CARD`, `CASH` |
| balance        | float   | Saldo atual                                  |
| credit_limit   | float?  | Só para `CREDIT_CARD`                        |
| closing_day    | int?    | Dia de fechamento — só `CREDIT_CARD`         |
| due_day        | int?    | Dia de vencimento — só `CREDIT_CARD`         |
| currency       | string  | Default `BRL`, porta aberta para multi-moeda |

### Category

| Campo   | Tipo    | Descrição                                |
| ------- | ------- | ---------------------------------------- |
| id      | uuid PK | —                                        |
| user_id | uuid FK | Todas as categorias pertencem ao usuário |
| name    | string  | Ex.: "Alimentação", "Transporte"         |
| icon    | string  | Identificador do ícone                   |
| color   | string  | Cor de destaque na UI                    |

### Subcategory

| Campo       | Tipo    | Descrição                                  |
| ----------- | ------- | ------------------------------------------ |
| id          | uuid PK | —                                          |
| category_id | uuid FK | Categoria pai                              |
| name        | string  | Ex.: "Restaurante" dentro de "Alimentação" |

### Budget

| Campo        | Tipo    | Descrição            |
| ------------ | ------- | -------------------- |
| id           | uuid PK | —                    |
| user_id      | uuid FK | —                    |
| category_id  | uuid FK | A categoria limitada |
| amount_limit | float   | Teto de gastos       |
| month        | int     | 1–12                 |
| year         | int     | Ex.: 2025            |

### Recurrence

| Campo          | Tipo     | Descrição                          |
| -------------- | -------- | ---------------------------------- |
| id             | uuid PK  | —                                  |
| account_id     | uuid FK  | Conta que será debitada            |
| category_id    | uuid FK  | —                                  |
| subcategory_id | uuid FK? | Opcional                           |
| description    | string   | Ex.: "Netflix", "Aluguel"          |
| amount         | float    | Valor fixo mensal                  |
| day_of_month   | int      | Dia que dispara (ex.: 18)          |
| start_date     | date     | Início da recorrência              |
| end_date       | date?    | Fim previsto — `null` = indefinido |
| is_active      | bool     | Para pausar sem deletar            |

### Transaction

| Campo                  | Tipo     | Descrição                                       |
| ---------------------- | -------- | ----------------------------------------------- |
| id                     | uuid PK  | —                                               |
| account_id             | uuid FK  | Conta de origem                                 |
| category_id            | uuid FK  | —                                               |
| subcategory_id         | uuid FK? | Opcional                                        |
| recurrence_id          | uuid FK? | Preenchido quando gerado por uma `Recurrence`   |
| destination_account_id | uuid FK? | Só para `TRANSFER`                              |
| amount                 | float    | Valor da transação                              |
| description            | string   | Descrição livre                                 |
| date                   | date     | Data do lançamento                              |
| type                   | enum     | `EXPENSE`, `INCOME`, `TRANSFER`                 |
| status                 | enum     | `PENDING`, `CONFIRMED`                          |
| installment_ref        | uuid?    | UUID que agrupa as parcelas de uma mesma compra |
| installment_number     | int?     | Ex.: 3                                          |
| installment_total      | int?     | Ex.: 10                                         |
| receipt_url            | string?  | Porta aberta para anexo de nota fiscal          |
| external_id            | string?  | Porta aberta para Open Finance                  |
