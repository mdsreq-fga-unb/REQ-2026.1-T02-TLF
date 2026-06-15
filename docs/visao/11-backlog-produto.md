# 9. Work Item List do produto

> Aqui, cabe destacar que todas Requisitos Funcionais, a seguir, são derivadas da lista de Casos de Uso apresentados. Esta é uma lista preliminar e deverá sofrer ajustes sempre que necessário, durante o desenvolvimento do produto do TLT finanças.

## 9.1 WIL Geral

A tabela, a seguir, apresenta cada um dos requisitos funcionais (RFs) declarados utilizando a técnica de Casos de Uso (UCs), assim como a rastreabilidade com os requisitos não funcionais (RNFs).

| RF                                                                 | Caso de Uso | Descrição do caso de uso                                                                                   | RNFs relacionados                               |
| ------------------------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| RF01 – cadastrar uma conta.                                        | UC01        | Permite ao usuário criar uma conta no sistema para iniciar seu acesso.                                     | RNF01, RNF04, RNF05, RNF09, RNF10               |
| RF02 – autenticar o usuário.                                       | UC02        | Permite ao usuário acessar sua conta no sistema por meio de login.                                         | RNF01, RNF03, RNF04, RNF05, RNF09               |
| RF03 – permitir a recuperação de senha.                            | UC03        | Permite ao usuário redefinir sua senha caso a tenha esquecido.                                             | RNF01, RNF04, RNF05, RNF09                      |
| RF04 – exibir um painel financeiro inicial.                        | UC04        | Exibe ao usuário uma visão geral simplificada das finanças, com saldo, últimas transações e resumo básico. | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF05 – exibir o histórico de transações.                           | UC05        | Permite ao usuário acessar o histórico completo de transações diretamente pelo painel inicial.             | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF06 – gerar um painel com resumo gráfico.                         | UC06        | Exibe um painel financeiro consolidado com gráficos e indicadores visuais.                                 | RNF02, RNF03, RNF05, RNF06, RNF09               |
| RF07 – registrar uma transação financeira.                         | UC07        | Permite ao usuário registrar receitas e despesas para atualizar o saldo e o controle financeiro.           | RNF02, RNF03, RNF04, RNF05, RNF08, RNF09, RNF12 |
| RF08 – editar uma transação.                                       | UC08        | Permite ao usuário alterar dados de uma transação financeira registrada anteriormente.                     | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF09 – excluir uma transação.                                      | UC09        | Permite ao usuário remover uma transação financeira registrada.                                            | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF10 – criar uma categoria de transação.                           | UC10        | Permite ao usuário criar uma nova categoria personalizada para classificar transações.                     | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF11 – editar uma categoria de transação.                          | UC11        | Permite ao usuário modificar dados de uma categoria existente.                                             | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF12 – excluir uma categoria de transação.                         | UC12        | Permite ao usuário remover uma categoria personalizada do sistema.                                         | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF13 – criar uma subcategoria de transação.                        | UC13        | Permite ao usuário criar uma subcategoria vinculada a uma categoria existente.                             | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF14 – editar uma subcategoria de transação.                       | UC14        | Permite ao usuário alterar o nome de uma subcategoria existente.                                           | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF15 – excluir uma subcategoria de transação.                      | UC15        | Permite ao usuário remover uma subcategoria do sistema.                                                    | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF16 – criar uma orçamento.                                        | UC16        | Permite ao usuário criar objetivos financeiros e definir metas ou limites de gastos.                       | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF17 – editar uma orçamento.                                       | UC17        | Permite ao usuário modificar metas financeiras e limites de gastos já cadastrados.                         | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF18 – excluir uma orçamento.                                      | UC18        | Permite ao usuário remover um planejamento financeiro ou meta do sistema.                                  | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF19 – cadastrar uma instituição financeira.                       | UC19        | Permite ao usuário cadastrar uma instituição financeira, como banco ou corretora.                          | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF20 – editar uma instituição financeira.                          | UC20        | Permite ao usuário modificar os dados de uma instituição financeira cadastrada.                            | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF21 – excluir uma instituição financeira.                         | UC21        | Permite ao usuário remover uma instituição financeira do sistema.                                          | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF22 – registrar uma conta financeira.                             | UC22        | Permite ao usuário registrar uma conta financeira vinculada a uma instituição.                             | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF23 – editar de uma conta financeira.                             | UC23        | Permite ao usuário modificar os dados de uma conta financeira registrada.                                  | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF24 – excluir uma conta financeira.                               | UC24        | Permite ao usuário apagar o registro de uma conta financeira cadastrada.                                   | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF25 – cadastrar uma transação recorrente.                         | UC25        | Permite ao usuário cadastrar uma transação que se repete periodicamente.                                   | RNF02, RNF03, RNF04, RNF05, RNF08, RNF09, RNF12 |
| RF26 – editar uma transação recorrente.                            | UC26        | Permite ao usuário modificar uma transação recorrente existente.                                           | RNF02, RNF03, RNF04, RNF05, RNF08, RNF09        |
| RF27 – excluir uma transação recorrente.                           | UC27        | Permite ao usuário cancelar uma recorrência e interromper lançamentos futuros.                             | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF28 – Exportar um relatório financeiro.                           | UC28        | Permite ao usuário gerar e exportar relatórios financeiros em formatos como PDF ou CSV.                    | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF29 – notificar quando um limite for atingido ou estiver próximo. | UC29        | Permite ao sistema alertar o usuário quando limites de gastos forem atingidos ou estiverem próximos.       | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF30 – permitir o envio de feedback.                               | UC30        | Permite ao usuário enviar feedback, reportar erros ou sugerir melhorias.                                   | RNF02, RNF04, RNF05, RNF09, RNF10, RNF11        |
| RF31 – gerar e exibir dica financeira personalizada.               | UC31        | Permite ao sistema analisar o comportamento financeiro do usuário e exibir dicas personalizadas.           | RNF02, RNF03, RNF04, RNF05, RNF09               |
| RF32 – disponibilizar materiais de educação financeira.            | UC32        | Permite ao usuário acessar materiais educativos recomendados, como cursos, vídeos e artigos.               | RNF02, RNF03, RNF04, RNF05, RNF06, RNF09        |

## 9.2 Priorização da WIL e escopo

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

| RF / RNF | Descrição                                                                                                                                         | Impacto       | Esforço       | Quadrante | Prioridade sugerida |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- | --------- | ------------------- |
| RF01     | cadastrar uma conta.                                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF02     | autenticar o usuário.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF04     | exibir um painel financeiro inicial.                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF05     | exibir o histórico de transações.                                                                                                                 | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF07     | registrar uma transação financeira.                                                                                                               | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF08     | editar uma transação.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF09     | excluir uma transação.                                                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF10     | criar uma categoria de transação.                                                                                                                 | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF11     | editar uma categoria de transação.                                                                                                                | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF12     | excluir uma categoria de transação.                                                                                                               | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF16     | criar uma orçamento.                                                                                                                              | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF17     | editar uma orçamento.                                                                                                                             | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF18     | excluir uma orçamento.                                                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN1     | As senhas devem atender a critérios mínimos de complexidade de acordo com uma pontuação acima de 2 na ZXCVBN.                                     | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN2     | O acesso às funcionalidades deve ser restrito a usuários autenticados.                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN9     | Os dados pessoais do usuário devem ser armazenados de forma criptografada no servidor.                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RFN03    | exibir um menu principal de navegação na área inicial.                                                                                            | Alto Impacto  | Baixo esforço | Q1        | Prioridade 1        |
| RF06     | gerar um painel com resumo gráfico.                                                                                                               | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RF25     | cadastrar uma transação recorrente.                                                                                                               | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RF26     | editar uma transação recorrente.                                                                                                                  | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RF27     | excluir uma transação recorrente.                                                                                                                 | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RF29     | notificar quando um limite for atingido ou estiver próximo de 80%.                                                                                | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN04    | As mensagens de erro devem ser exibidas de forma padronizada e legível nas telas do aplicativo móvel.                                             | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN05    | O sistema deve funcionar nos principais sistemas operacionais móveis Android 7.0 (API 24) ou superior.                                            | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN07    | O sistema deve continuar útil em ambientes com internet instável ou indisponível, preservando a funcionalidade de registro financeiro básico.     | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RFN11    | O sistema deve sincronizar automaticamente com o servidor as transações registradas offline assim que a conexão com a internet for restabelecida. | Alto Impacto  | Alto esforço  | Q2        | Prioridade 2        |
| RF13     | criar uma subcategoria de transação.                                                                                                              | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF14     | editar uma subcategoria de transação.                                                                                                             | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF15     | excluir uma subcategoria de transação.                                                                                                            | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF19     | cadastrar uma instituição financeira.                                                                                                             | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF20     | editar uma instituição financeira.                                                                                                                | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF21     | excluir uma instituição financeira.                                                                                                               | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF22     | registrar uma conta financeira.                                                                                                                   | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF23     | editar uma conta financeira.                                                                                                                      | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF24     | excluir uma conta financeira.                                                                                                                     | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF30     | permitir o envio de comentario de feedback.                                                                                                       | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF03     | permitir a recuperação de senha.                                                                                                                  | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF06    | permitir a alteração do tema de visualização entre claro e escuro.                                                                                | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF08    | as telas devem ser carregadas em até 3 segundos.                                                                                                  | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RNF10    | O envio de feedback não deve expor, involuntariamente, informações do usuário.                                                                    | Baixo Impacto | Baixo esforço | Q3        | Prioridade 3        |
| RF28     | Exportar um relatório financeiro CSV.                                                                                                             | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |
| RF31     | gerar e exibir dica financeira personalizada com IA.                                                                                              | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |
| RF32     | disponibilizar PDFs de educação financeira.                                                                                                       | Baixo Impacto | Alto esforço  | Q4        | Prioridade 4        |

---
