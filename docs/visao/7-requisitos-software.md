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

- **RF16** – criar uma meta ou orçamento. (UC16)
- **RF17** – editar uma meta ou orçamento. (UC17)
- **RF18** – excluir uma meta ou orçamento. (UC18)

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

- **RF28** – Exportar um relatório financeiro. (UC28) 

### Notificações e Erros

- **RF29** – notificar quando um limite for atingido ou estiver próximo. (UC29)

### Interface e Configurações

- **RF30** – permitir o envio de feedback. (UC30)

### Conteúdos Educacionais

- **RF31** – gerar e exibir dica financeira personalizada. (UC31) 
- **RF32** – disponibilizar materiais de educação financeira. (UC32) 

## 7.2 Lista de Requisitos Não Funcionais

### Segurança

- **RNF01** – As senhas devem atender a critérios mínimos de complexidade.
- **RNF02** – O acesso às funcionalidades deve ser restrito a usuários autenticados.

### Usabilidade

- **RNF03** – exibir um menu principal de navegação.
- **RNF04** – As mensagens de erro devem ser orientativas e claras.
- **RNF05** – As mensagens de erro devem ser exibidas de forma padronizada e legível nas telas do aplicativo móvel.
- **RNF06** – O sistema deve funcionar nos principais sistemas operacionais móveis Android.
- **RNF07** – permitir a alteração do tema de visualização.
- **RNF08** – O sistema deve continuar útil em ambientes com internet instável ou indisponível, preservando a funcionalidade de registro financeiro básico.

### Desempenho

- **RNF09** – as telas devem ser carregadas em até 3 segundos.

### Confiabilidade

- **RNF10** – Os dados pessoais do usuário devem ser armazenados de forma criptografada no servidor.
- **RNF11** – O envio de feedback não deve expor, involuntariamente, informações financeiras do usuário.
- **RNF12** – O sistema deve sincronizar automaticamente com o servidor as transações registradas offline assim que a conexão com a internet for restabelecida.

---