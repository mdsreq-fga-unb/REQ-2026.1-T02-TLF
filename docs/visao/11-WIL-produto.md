# 11. Work Item List do produto

> Aqui, cabe destacar que todas Requisitos Funcionais, a seguir, são derivadas da lista de Casos de Uso apresentados. Esta é uma lista preliminar e deverá sofrer ajustes sempre que necessário, durante o desenvolvimento do produto do TLT finanças.

## 11.1 WIL Geral

A tabela, a seguir, apresenta cada um dos requisitos funcionais (RFs) declarados utilizando a técnica de Casos de Uso (UCs), assim como a rastreabilidade com os requisitos não funcionais (RNFs).

- ✅ = Concluido
- 🛠️ = Em andamento
- 💤 = Não iniciado
- ❌ = Removido
- 📵 = Fora do escopo

| Item | UC/RF                      | RNF   | Iteração | Responsavel      | Status | observações                                         |
| :--: | -------------------------- | ----- | :------- | ---------------- | ------ | --------------------------------------------------- |
|  1   | [UC-01](./casodeuso-01.md) | RNF01 | 3        | Danilo; Gabriel; | ✅     |                                                     |
|  2   | [UC-02](./casodeuso-02.md) | RNF01 | 3        | Danilo; Gabriel; | ✅     |                                                     |
|  3   | [UC-03](./casodeuso-03.md) | RNF01 | -        | -                | 📵     |                                                     |
|  4   | [UC-04](./casodeuso-04.md) | -     | 4        | Daniel; Lucas;   | ✅     |                                                     |
|  5   | [UC-05](./casodeuso-05.md) | -     | 4        | Daniel; Lucas;   | ✅     |                                                     |
|  6   | [UC-06](./casodeuso-06.md) | RNF05 | 7        | Gabriel;         | ✅     |                                                     |
|  7   | [UC-07](./casodeuso-07.md) | -     | 4        | Lucas; Tiago;    | ✅     |                                                     |
|  8   | [UC-08](./casodeuso-08.md) | -     | 4        | Lucas; Tiago;    | ✅     |                                                     |
|  9   | [UC-09](./casodeuso-09.md) | -     | 4        | Daniel; Lucas;   | ✅     |                                                     |
|  10  | [UC-10](./casodeuso-10.md) | -     | 6        | Gabriel; Tiago;  | ✅     |                                                     |
|  11  | [UC-11](./casodeuso-11.md) | -     | 6        | Gabriel; Tiago;  | ✅     |                                                     |
|  12  | [UC-12](./casodeuso-12.md) | -     | 6        | Gabriel; Tiago;  | ✅     |                                                     |
|  13  | [UC-13](./casodeuso-13.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  14  | [UC-14](./casodeuso-14.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  15  | [UC-15](./casodeuso-15.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  16  | [UC-16](./casodeuso-16.md) | -     | 5        | Gabriel; Tiago;  | ✅     |                                                     |
|  17  | [UC-17](./casodeuso-17.md) | -     | 5        | Gabriel; Tiago;  | ✅     |                                                     |
|  18  | [UC-18](./casodeuso-18.md) | -     | 5        | Gabriel; Tiago;  | ✅     |                                                     |
|  19  | [UC-19](./casodeuso-19.md) | -     | 8        | Lucas; Tiago;    | ✅     |                                                     |
|  20  | [UC-20](./casodeuso-20.md) | -     | 8        | Lucas; Tiago;    | ✅     |                                                     |
|  21  | [UC-21](./casodeuso-21.md) | -     | 8        | Lucas; Tiago;    | ✅     |                                                     |
|  22  | [UC-22](./casodeuso-22.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  23  | [UC-23](./casodeuso-23.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  24  | [UC-24](./casodeuso-24.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  25  | [UC-25](./casodeuso-25.md) | -     | 5        | Daniel; Lucas;   | ✅     |                                                     |
|  26  | [UC-26](./casodeuso-26.md) | -     | 5        | Daniel; Lucas;   | ✅     |                                                     |
|  27  | [UC-27](./casodeuso-27.md) | -     | 5        | Daniel; Lucas;   | ✅     |                                                     |
|  28  | [UC-28](./casodeuso-28.md) | -     | -        | -                | ❌     | Removido devido a atrasos com o fluxo Offline-first |
|  29  | [UC-29](./casodeuso-29.md) | -     | 6        | Danilo;          | ✅     |                                                     |
|  30  | [UC-30](./casodeuso-30.md) | RNF10 | -        | -                | 📵     |                                                     |
|  31  | [UC-31](./casodeuso-31.md) | -     | -        | -                | 📵     |                                                     |
|  32  | [UC-32](./casodeuso-32.md) | RNF05 | -        | -                | 📵     |                                                     |

- RNF02 se aplica aos UC04 a UC32.
- RNF03 se aplica aos UC02 e UC04 a UC32.
- RNF04 se aplica aos UC01, UC02 e UC04 a UC32, exceto UC06.
- RNF06 se aplica aos UC01 a UC32 (todos).
- RNF07 se aplica aos UC07, UC25 e UC26.
- RNF08 se aplica aos UC01 a UC32 (todos).
- RNF09 se aplica aos UC01 a UC32.
- RNF11 se aplica aos UC04 a UC32.

## 11.2 Priorização da WIL e escopo

Para a priorização do backlog foram utilizados os seguintes critérios:

- **Impacto** = valor de negócio (Alto ou Baixo)
- **Esforço** = esforço de implementação (Alto ou Baixo)

**Esforço:** É definido como total de dias necessários, tendo de 4 a 6 horas de trabalho por dia, para completar um requisito, de acordo com a Definition of Done (DoD) do documento de visão e produto.

- **Baixo Esforço:** abaixo ou igual á 4 dias ou até 20 horas semanais;
- **Alto Esforço:** Acima de 4 dias ou Mais que 20 horas semanais;

Os dias necessários para cada funcionalidade foram calculados decompondo os requisitos em pequenas tarefas e fazendo uma média de tempo para cada tarefa a partir do tempo de implementação de tarefas similares em repositórios de projetos que os membros da equipe já trabalharam.

**Impacto:** É definido como total médio de vezes que um usuário utiliza aquele requisito por abertura do aplicativo ou por semana.

- **Baixo Impacto:** abaixo de 1 vez por acesso e abaixo de 2 vezes por semana;
- **Alto Impacto:** acima de 1 vez por acesso ou igual ou acima de 2 vezes por semana;

O número de acessos e utilizações foram adquiridos dividindo o Impacto em Esperado, uma estimativa baseada no quanto equipe espera que um usuário lida com situações que possam ser resolvidas por requisitos definidos anteriormente, e Percebido, uma estimativa feita a partir de uma rápida pesquisa com o cliente em relação a frequência que ele lida com situações que possam ser resolvidas por requisitos definidos anteriormente.

A partir disso, foi gerada a seguinte Matriz de valor e impacto:

<iframe width="100%" height="500" src="https://miro.com/app/board/uXjVHTBwhKE=/?share_link_id=623549294839" title="Matriz de impacto e esforçp" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
[Matriz de valor e impacto](https://miro.com/app/board/uXjVHTBwhKE=/?share_link_id=623549294839)

<a id="WIL-priorizada"></a>

| RF / RNF | Descrição                                                                                                                                         | Impacto       | Esforço       | Quadrante | Prioridade sugerida |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- | --------- | ------------------- |
| UC01     | cadastrar uma conta.                                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC02     | autenticar o usuário.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC04     | exibir um painel financeiro inicial.                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC05     | exibir o histórico de transações.                                                                                                                 | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC07     | registrar uma transação financeira.                                                                                                               | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC08     | editar uma transação.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC09     | excluir uma transação.                                                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC10     | criar uma categoria de transação.                                                                                                                 | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC11     | editar uma categoria de transação.                                                                                                                | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC12     | excluir uma categoria de transação.                                                                                                               | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC16     | criar uma orçamento.                                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC17     | editar uma orçamento.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC18     | excluir uma orçamento.                                                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN1     | As senhas devem atender a critérios mínimos de complexidade de acordo com uma pontuação acima de 2 na ZXCVBN.                                     | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN2     | O acesso às funcionalidades deve ser restrito a usuários autenticados.                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN9     | Os dados pessoais do usuário devem ser armazenados de forma criptografada no servidor.                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN03    | exibir um menu principal de navegação na área inicial.                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| UC06     | gerar um painel com resumo gráfico.                                                                                                               | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| UC25     | cadastrar uma transação recorrente.                                                                                                               | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| UC26     | editar uma transação recorrente.                                                                                                                  | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| UC27     | excluir uma transação recorrente.                                                                                                                 | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| UC29     | notificar quando um limite for atingido ou estiver próximo de 80%.                                                                                | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN04    | As mensagens de erro devem ser exibidas de forma padronizada e legível nas telas do aplicativo móvel.                                             | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN05    | O sistema deve funcionar nos principais sistemas operacionais móveis Android 7.0 (API 24) ou superior.                                            | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN07    | O sistema deve continuar útil em ambientes com internet instável ou indisponível, preservando a funcionalidade de registro financeiro básico.     | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN11    | O sistema deve sincronizar automaticamente com o servidor as transações registradas offline assim que a conexão com a internet for restabelecida. | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| UC13     | criar uma subcategoria de transação.                                                                                                              | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC14     | editar uma subcategoria de transação.                                                                                                             | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC15     | excluir uma subcategoria de transação.                                                                                                            | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC19     | cadastrar uma instituição financeira.                                                                                                             | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC20     | editar uma instituição financeira.                                                                                                                | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC21     | excluir uma instituição financeira.                                                                                                               | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC22     | registrar uma conta financeira.                                                                                                                   | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC23     | editar uma conta financeira.                                                                                                                      | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC24     | excluir uma conta financeira.                                                                                                                     | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC30     | permitir o envio de comentario de feedback.                                                                                                       | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC03     | permitir a recuperação de senha.                                                                                                                  | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF06    | permitir a alteração do tema de visualização entre claro e escuro.                                                                                | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF08    | as telas devem ser carregadas em até 3 segundos.                                                                                                  | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF10    | O envio de feedback não deve expor, involuntariamente, informações do usuário.                                                                    | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| UC28     | Exportar um relatório financeiro CSV.                                                                                                             | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |
| UC31     | gerar e exibir dica financeira personalizada com IA.                                                                                              | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |
| UC32     | disponibilizar PDFs de educação financeira.                                                                                                       | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |

## 11.3 Execução da WIL

---
