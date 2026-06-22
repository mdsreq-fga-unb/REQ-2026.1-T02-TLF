# 7 REQUISITOS DE SOFTWARE

## 7.1 Lista de Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades específicas que o sistema deve implementar para atender às necessidades do TLT finanças. A seguir, são apresentados o conjunto preliminar de requisitos:

### Módulo de Conta e Autenticação

- **RF01** – cadastrar uma conta. (UC01)
- **RF02** – autenticar o usuário. (UC02)
- **RF03** – permitir a recuperação de senha. (UC03)

### Painel e Visualização

- **RF04** – exibir um painel financeiro inicial. (UC04)
- **RF05** – exibir o histórico de transações. (UC05)
- **RF06** – gerar um painel com resumo gráfico. (UC06)

### Gestão de Transações

- **RF07** – registrar uma transação financeira. (UC07)
- **RF08** – editar uma transação. (UC08)
- **RF09** – excluir uma transação. (UC09)

### Gestão de Categorias e Subcategorias

- **RF10** – criar uma categoria de transação. (UC10)
- **RF11** – editar uma categoria de transação. (UC11)
- **RF12** – excluir uma categoria de transação. (UC12)
- **RF13** – criar uma subcategoria de transação. (UC13)
- **RF14** – editar uma subcategoria de transação. (UC14)
- **RF15** – excluir uma subcategoria de transação. (UC15)

### Orçamentos e Metas

- **RF16** – criar uma orçamento. (UC16)
- **RF17** – editar uma orçamento. (UC17)
- **RF18** – excluir uma orçamento. (UC18)

### Instituições Financeiras e Contas

- **RF19** – cadastrar uma instituição financeira. (UC19)
- **RF20** – editar uma instituição financeira. (UC20)
- **RF21** – excluir uma instituição financeira. (UC21)
- **RF22** – registrar uma conta financeira. (UC22)
- **RF23** – editar de uma conta financeira. (UC23)
- **RF24** – excluir uma conta financeira. (UC24)

### Transações Recorrentes

- **RF25** – cadastrar uma transação recorrente. (UC25)
- **RF26** – editar uma transação recorrente. (UC26)
- **RF27** – excluir uma transação recorrente. (UC27)

### Relatórios e Exportação

- **RF28** – Exportar um relatório financeiro CSV. (UC28)

### Notificações e Erros

- **RF29** – notificar quando um limite for atingido ou estiver próximo de 80%. (UC29)

### Interface e Configurações

- **RF30** – permitir o envio de comentarios de feedback. (UC30)

### Conteúdos Educacionais

- **RF31** – gerar e exibir dica financeira com IA. (UC31)
- **RF32** – disponibilizar PDFs de educação financeira. (UC32)

## 7.2 Lista de Requisitos Não Funcionais

### Segurança

- **RNF01** – As senhas devem atender a critérios mínimos de complexidade de acordo com uma pontuação acima de 2 na ZXCVBN.
- **RNF02** – O acesso às funcionalidades deve ser restrito a usuários autenticados.

### Usabilidade

- **RNF03** – exibir um menu principal de navegação na área inicial.
- **RNF04** – As mensagens de erro devem ser exibidas de forma padronizada e legível nas telas do aplicativo móvel de acordo com padrões da WCAG.
- **RNF05** – O sistema deve funcionar nos principais sistemas operacionais móveis Android 7.0 (API 24) ou superior.
- **RNF06** – permitir a alteração do tema de visualização entre claro e escuro.
- **RNF07** – O sistema deve continuar útil em ambientes com internet instável ou indisponível, preservando a funcionalidade de registro financeiro básico.

### Desempenho

- **RNF08** – Todas telas devem ser carregadas em até 3 segundos.

### Confiabilidade

- **RNF09** – Os dados pessoais do usuário devem ser armazenados de forma criptografada no servidor.
- **RNF10** – O envio de feedback não deve expor, involuntariamente, informações do usuário.
- **RNF11** – O sistema deve sincronizar automaticamente com o servidor as transações registradas offline assim que a conexão com a internet for restabelecida.

## 7.3 Matriz-síntese de rastreabilidade

<iframe width="100%" height="500" src="https://miro.com/app/board/uXjVHTxsQHI=/?share_link_id=455679825476" title="Árvore de rastreabilidade no miro" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
[Árvore de rastreabilidade no miro](https://miro.com/app/board/uXjVHTxsQHI=/?share_link_id=455679825476)

| Contribuição principal | CP   | RFs relacionados                                                       | RNFs relacionados   |
| ---------------------- | ---- | ---------------------------------------------------------------------- | ------------------- |
| OE1                    | CP1  | RF04, RF30                                                             | RFN03               |
| OE3                    | CP2  | RF07, RF08, RF09, RF25, RF26, RF27                                     | -                   |
| OE4                    | CP3  | RF05                                                                   | RFN09               |
| OE2                    | CP4  | RF06, RF28                                                             | -                   |
| OE3                    | CP5  | -                                                                      | RNF07, RNF11        |
| OE6                    | CP6  | -                                                                      | RNF05, RNF06, RNF08 |
| OE5                    | CP7  | -                                                                      | RNF01, RNF10        |
| OE3                    | CP8  | RF19, RF20, RF21, RF22, RF23, RF24, RF10, RF11, RF12, RF13, RF14, RF15 | -                   |
| OE1                    | CP9  | RF16, RF17, RF18, RF29                                                 | -                   |
| OE5                    | CP10 | RF01, RF02, RF03                                                       | RNF02               |
| OE6                    | CP11 | -                                                                      | RNF04               |

---
