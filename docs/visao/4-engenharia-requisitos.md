# 4 ENGENHARIA DE REQUISITOS

## 4.1 Atividades e Técnicas de ER

### Concepção

#### Elicitação e Descoberta

- **Brainstorm**: Essa técnica de Brainstorm realizada com os stakeholders, auxilia para o desenvolvimento criativo do projeto TLT Finanças, incluindo ideias para a melhoria da experiência do usuário e ideias de implementação.

- **Entrevista**: A entrevista com os stakeholders pode ajudar a entender as necessidades, problemas, soluções e expectativas em relação ao produto de software. Além disso, pode alinhar a identificação das funcionalidades importantes para o projeto.

- **Análise de Viabilidade**: Avaliação técnica preliminar das tecnologias escolhidas (React Native, NestJS, PostgreSQL) para garantir que a equipe consegue implementar o MVP no prazo.

#### Análise e Consenso

- **Análise de custo / Benefício**: Análise de custo e benefício das funcionalidades ajuda a saber quais serão as decisões tomadas em relação a o escopo do projeto, ao analisar fatores como a satisfação do cliente e custo de execução.

- **Priorização MosCoW**: Técnica utilizada para definir o que é mais crítico para o projeto em termos de valor de negócio e risco arquitetural e o nível de prioridade de cada requisitos. Essa técnica é classificada como: Must Have, Should have, Could have, Won't have.

- **Análise de Objetivo e Domínio**: Essa técnica garante que o que será desenvolvido atende o objetivo do produto ao examinar a relação entre objetivos de negócios e tarefas.

#### Declaração:

- **Casos de Uso**: Definir casos de uso descreve as interações passo a passo entre os atores (usuários) e o sistema e auxilia na organização de requisitos, ficando claro o que será desenvolvido, e alinhando o entendimento necessário para o produto de software.

#### Verificação e Validação:

- **Avaliação da Iteração**: Confirmação com a equipe e o cliente para validar o alinhamento da visão da equipe com a visão do usuário do projeto faz sentido antes de avançar.

#### Organização e Atualização:

- **Planejamento da Iteração**: Reunião inicial para definir o que priorizar no TLT Finanças. Nessa etapa é organizada a agenda de conversas com o cliente e são decididas as metas da fase.

### Elaboração

#### Análise e Consenso:

- **Decomposição de Tarefas**: A equipe realiza a quebra dos requisitos priorizados na iteração em tarefas técnicas menores. Isso permite definir o esforço técnico necessário e facilita a auto-organização da equipe para o desenvolvimento da sprint.

- **Discussão em equipe**: Reuniões para o alinhamento do projeto com a equipe de desenvolvimento garante um melhor entendimento na maneira de desenvolver o projeto, e quais tecnologias serão necessárias para o TLT Finanças.

- **Protótipos**: A criação de protótipos como a página de saldo ou a página de gráficos, ajuda a alinhar o entendimento das funções que serão implementadas para os stakeholders.

- **Especificação Suplementar**: Levantamento de requisitos não funcionais e regras de negócio críticos para o TLT Finanças, como segurança da LGPD, persistência offline e tempo de resposta da sincronização.

#### Declaração:

- **Critérios de Aceitação Detalhados, Definition of Ready (DoR)**: Definir critérios de aceitação bem detalhados garante a fácil validação e a aprovação dos requisitos. Além disso, também ajuda a ter informações suficientes para o trabalho.

#### Representação:

- **Refinamento de Protótipos**: Evolução dos esboços iniciais para protótipos de alta fidelidade para validar o fluxo de navegação complexo de cadastro e lançamentos com o cliente.

#### Verificação e Validação:

- **Avaliação da Iteração**: Revisão técnica para garantir que os requisitos detalhados estão estáveis e que a base do sistema garante segurança antes do início da fase de Construção.

#### Organização e Atualização:

- **Planejamento da Iteração**: Seleção dos Casos de Uso arquiteturalmente significantes. O planejamento foca em priorizar os requisitos que apresentam maiores desafios técnicos.

- **Refinamento da Work Item List**: A refinação da Work Item List é uma técnica para ver se a equipe está alinhada, e que os requisitos estejam bem entendidos e priorizados antes do início da iteração. Sendo importante considerar as limitações gerais dos stakeholders do TLT Finanças.

### Construção

#### Representação:

- **Protótipos**: Protótipos são evoluídos para versões mais completas do sistema, incorporando feedback dos stakeholders e refinando aspectos de usabilidade e funcionalidades, como melhorias na visualização de saldo e gráficos financeiros, garantindo que o sistema final atenda com precisão às necessidades identificadas.

#### Verificação e Validação:

- **Avaliação da Iteração**: Demonstração técnica dos requisitos implementados ao cliente. Coleta de feedbacks para refinamento do produto e verificação do atendimento aos critérios de aceite.

- **Checklist**: A utilização de checklist garante que cada funcionalidade desenvolvida abrange os pontos importantes daquela função.

- **Feedback do cliente**: Essa técnica consiste em validar continuamente o que foi feito está correto. Assim, garantindo uma melhoria do projeto.

- **Definição de Pronto - Definition of Done (DoD)**: Estabelecimento de critérios técnicos (testes unitários com Jest, documentação Swagger atualizada) que um Caso de Uso deve cumprir para ser considerado finalizado.

- **Testes de Usabilidade**: Observação do uso do sistema por perfis que representam os jovens adultos em dificuldade financeira. O objetivo é identificar barreiras na interface que possam causar o abandono da ferramenta antes da entrega final.

#### Organização e Atualização:

- **Planejamento da Iteração**: Seleção e priorização de novos itens da Work Item List para serem transformados em funcionalidades. Ajuste das estimativas com base no desempenho das iterações anteriores.

- **Revisão da Work Item List da Iteração, DEEP**: Garantir que a Work Item List da iteração esteja Detalhada, Emergente, Estimável, Priorizada. Assim, ajuda na organização e permite pequenas mudanças caso haja um obstáculo.

### Transição

#### Verificação e Validação:

- **Avaliação da Iteração**: Avaliação do estado final do software. Foca na validação dos últimos ajustes de interface e correção de defeitos, assegurando que o sistema atende às necessidades dos usuários finais para o lançamento.

- **Feedback do cliente**: Essa técnica consiste em validar continuamente o que foi feito está correto. Assim, garantindo uma melhoria do projeto.

- **Homologação do Sistema**: Sessão final de uso do aplicativo pelo cliente em ambiente real para confirmar se a solução realmente resolve o problema da falta de controle financeiro antes da entrega do MVP.

- **Elaboração de Material de Apoio**: Criação de guias rápidos ou vídeos tutoriais para ajudar o público de baixa renda ou com pouco conhecimento financeiro a utilizar o app.

## 4.2 Engenharia de Requisitos e o ScrumOpenUP

| Fases do Processo | Atividades ER | Prática | Técnica | Resultado Esperado |
|-------------------|---------------|--------|--------|--------------------|
| **Concepção** | Elicitação e Descoberta | Descoberta de requisitos | Brainstorm e Entrevistas | Visão do Produto e necessidades alinhadas |
| | Análise e Consenso | Estudo de Viabilidade e Priorização | Análise Custo Benefício e MoSCoW | Escopo inicial definido e tecnologias validadas |
| | Declaração | Definição de Escopo | Casos de Uso | Interações ator-sistema documentadas |
| | Verificação e Validação | Validação da Visão | Avaliação da Iteração | Alinhamento da equipe com a visão do usuário |
| | Organização e Atualização | Gestão do Ciclo de Vida | Planejamento da Iteração | Metas da fase e agenda de trabalho definidas |
| **Elaboração** | Análise e Consenso | Detalhamento Técnico | Decomposição de Tarefas e Discussão em Equipe | Esforço técnico definido e arquitetura estável |
| | Declaração | Definição de Prontidão | Critérios de Aceitação e DoR | Requisitos prontos para o desenvolvimento |
| | Representação | Modelagem de Interface | Protótipos e Refinamento de Protótipos | Fluxo de navegação e telas críticas validadas |
| | Verificação e Validação | Garantia de Estabilidade | Avaliação da Iteração | Requisitos detalhados e segurança confirmados |
| | Organização e Atualização | Gestão de Riscos | Planejamento da Iteração e Refinamento da Work Item List | Casos de uso significantes priorizados |
| **Construção** | Representação | Evolução do Produto | Protótipos Evolutivos | Interface refinada com feedbacks contínuos |
| | Verificação e Validação | Garantia de Qualidade | Avaliação da Iteração, Checklist, Feedback e DoD | Incrementos validados e conforme critérios de aceite |
| | Organização e Atualização | Gestão de Incrementos | Planejamento da Iteração e Revisão DEEP | Work Item List organizada e estimativas ajustadas |
| **Transição** | Verificação e Validação | Entrega e Homologação | Avaliação da Iteração, Feedback e Homologação | Sistema pronto para lançamento e aceite final |

---
