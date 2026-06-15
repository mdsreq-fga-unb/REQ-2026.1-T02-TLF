# 2 SOLUÇÃO PROPOSTA

## 2.1 Objetivo Geral do Produto

O objetivo central do produto é aumentar a organização financeira dos usuários por meio de uma plataforma de gestão inteligente e integrada para diminuir a falta de controle e rastreabilidade das finanças. O foco é substituir o caos das planilhas manuais por um ecossistema que ofereça controle em tempo real de receitas e despesas, eliminando surpresas como faturas, juros e parcelas, garantindo uma jornada de planejamento personalizada para cada perfil de consumo e auxiliando o usuário a manter a noção de seus gastos.

## 2.2 Objetivos Específicos (OE) do Produto

- (OE1) Apoiar a organização financeira pessoal do usuário.
- (OE2) Apoiar a análise de receitas e despesas.
- (OE3) Permitir o registro e a consulta de lançamentos financeiros.
- (OE4) Permitir acompanhar o fluxo de caixa e rastrear o histórico financeiro.
- (OE5) Proteger as informações financeiras do usuário.
- (OE6) Garantir o uso da aplicação em dispositivos móveis.

## 2.3 Características de Produto (mapeadas com os Objetivos Específicos do Produto)

A solução proposta para a **TLT finanças** deverá contemplar, de forma preliminar, as seguintes características:

| ID   | Característica                               | Descrição resumida                                                                                                                                                                             | Valor de negócio principal                                                 | Contribuição principal | Contribuição secundária |
| ---- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------- | ----------------------- |
| CP1  | Painel financeiro consolidado                | Visão unificada de receitas, despesas, saldo e categorias em um único painel.                                                                                                                  | Facilita a organização e o entendimento da situação financeira.            | OE1                    | OE2                     |
| CP2  | Registro e acompanhamento de transações      | Permite registrar e ver entradas, saídas, pagamentos e recebimentos de forma simples e contínua.                                                                                               | Melhora o controle do fluxo de caixa e reduz esquecimentos.                | OE3                    | OE2                     |
| CP3  | Histórico financeiro                         | Permite consultar, filtrar e acompanhar o histórico de transações realizadas pelo usuário.                                                                                                     | Facilita auditoria pessoal e acompanhamento das movimentações financeiras. | OE4                    | OE2                     |
| CP4  | Relatórios e gráficos analíticos             | Gera gráficos e resumos para facilitar a leitura e comparação dos gastos.                                                                                                                      | Ajuda o usuário a interpretar seus dados financeiros com mais clareza.     | OE2                    | -                       |
| CP5  | Registro offline de transações               | Permite registrar transações sem conexão com a internet e sincronizar os dados posteriormente.                                                                                                 | Mantém o registro financeiro disponível em cenários de conexão limitada.   | OE3                    | -                       |
| CP6  | Interface móvel simplificada                 | Disponibiliza as funções principais com poucos cliques em dispositivos móveis.                                                                                                                 | Torna o uso mais prático, rápido e acessível no dia a dia.                 | OE6                    | -                       |
| CP7  | Segurança e proteção de dados                | Aplica mecanismos de autenticação, criptografia e controle de acesso.                                                                                                                          | Protege informações sensíveis e aumenta a confiança no sistema.            | OE5                    | -                       |
| CP8  | Gestão da estrutura financeira               | Permite filtrar gastos por data, instituição, conta, categoria, tipo e valor.                                                                                                                  | Apoia uma análise mais precisa dos dados financeiros.                      | OE4                    | OE2                     |
| CP9  | Organização por objetivos financeiros        | Permite vincular lançamentos e saldos a objetivos como reserva ou quitação de dívidas (metas e orçamentos).                                                                                    | Ajuda o usuário a enxergar para onde o dinheiro está indo.                 | OE1                    | OE2                     |
| CP10 | Acesso seguro à sessão                       | Exige autenticação para acesso às informações e mantém a sessão protegida no dispositivo.                                                                                                      | Reforça a proteção das informações do usuário.                             | OE5                    | -                       |
| CP11 | Tratamento de mensagens de erro orientativas | O sistema deve exibir mensagens de erro claras e objetivas quando ocorrerem falhas de uso ou validação, informando ao usuário a causa do problema e a orientação necessária para sua correção. | Melhora a compreensão do sistema e reduz falhas de uso.                    | OE6                    | -                       |

## 2.4 Tecnologias a Serem Utilizadas

No frontend mobile, será utilizado React Native (Expo), por permitir o desenvolvimento de uma interface responsiva, prática e adequada para dispositivos móveis. Para a visualização de dados financeiros, será empregada a biblioteca Victory Native (Charts), possibilitando a criação de gráficos e relatórios de forma clara e intuitiva. Para a persistência local e suporte ao funcionamento offline, será utilizado o WatermelonDB, que favorece o armazenamento eficiente dos lançamentos financeiros no dispositivo do usuário.

No backend, a solução será desenvolvida com Node.js e NestJS, que oferecem uma base robusta para a implementação de serviços, regras de negócio e integração entre as camadas do sistema. Para o banco de dados, será utilizado PostgreSQL, com o apoio do Prisma como ORM, facilitando o mapeamento e o gerenciamento das entidades da aplicação. A autenticação dos usuários será realizada por meio do Supabase Auth, contribuindo para o controle de acesso e proteção das informações.

Além disso, serão utilizados Swagger para documentação da API, Jest para testes automatizados, API RESTful para comunicação entre os componentes do sistema e Git e GitHub para versionamento e colaboração entre os integrantes da equipe. A solução também considerará diretrizes de conformidade com a LGPD, garantindo maior cuidado com a privacidade e o tratamento dos dados financeiros do usuário.

## 2.5 Pesquisa de Mercado e Análise Competitiva

Existem várias soluções consolidadas no mercado de gerenciamento financeiro pessoal: Mobills, Organizze e Guiabolso, que oferecem funcionalidades como controle de gastos, categorização de despesas e relatórios financeiros e são amplamente utilizadas por usuários na busca de organização financeira. Contudo, apesar do caráter robusto das soluções, elas possuem algumas limitações significativas na perspectiva do público-alvo do TLT Finanças:

- **Mobills**: Esta plataforma possui uma interface bastante completa, mas a maioria de suas funcionalidades relevantes estão disponíveis só na versão paga, limitações que exclui os usuários de baixa renda. Adicionalmente, pode ser considerada bastante complicada para os usuários que possuem baixo nível de educação financeira.

- **Organizze**: Apresenta um bom controle financeiro e interface simples, mas carece de funcionalidades mais sofisticadas em educação financeira e personalização de acordo com o comportamento do usuário.

- **Guiabolso**: Oferece diferencial pela integração com contas bancárias, mas levanta questões em relação à privacidade dos dados e tem dependência muito forte de integrações externas, o que pode prejudicar a sua confiabilidade e disponibilidade.

Deste modo, a solução proposta pelo TLT Finanças se diferencia por:

- **Foco em acessibilidade e simplicidade**: A plataforma será construída para usuários de baixo nível de educação financeira, com atenção especial para uma interface intuitiva, linguagem simples e fluxo de uso direto.

- **Funcionalidade offline integrada com a sincronização**: A funcionalidade permitirá o registro de dados mesmo offline e realizará a sincronização dos dados assim que a conexão for restabelecida, o que é particularmente relevante para usuários com acesso limitado à Internet.

- **Gratuidade e inclusão digital**: A proposta objetiva ser acessível sem barreiras financeiras, ampliando o público-alvo para aqueles que não têm condições de arcar com soluções pagas.

## 2.6 Viabilidade da Proposta

A proposta do TLT Finanças se revela viável no contexto da disciplina, tendo em vista o escopo definido, a composição da equipe e a possibilidade de um desenvolvimento incremental ao longo do semestre. O projeto foi pensado dentro de um modelo iterativo e incremental, com iterações semanais e entregas contínuas, possibilitando assim a validação frequente das funcionalidades com o cliente e o ajuste do escopo ao longo do tempo. Essa abordagem minimiza riscos e proporciona uma maior aderência da solução às efetivas necessidades do usuário.

Do aspecto técnico, a equipe desenvolverá o projeto utilizando tecnologias já consolidadas no desenvolvimento web e mobile, como React Native, Node.js e PostgreSQL, o que favorece a curva de aprendizado e o suporte pela documentação disponível. Além disso, a divisão das funcionalidades em módulos independentes (como entrada de transações, painel financeiro e relatórios) permite a implementação do sistema de forma gradual.

O maior risco do projeto está relacionado à integração de funcionalidades mais complexas, como sincronização de dados e persistência offline, além do desafio de garantir a experiência simples do usuário. No entanto, como estes riscos são mitigados pela priorização de funcionalidades essenciais em um MVP (produto mínimo viável) e pela validação constante com o cliente ao longo das iterações, a proposta é considerada viável.

Dessa forma, a proposta é considerada viável, a condição de que:

- O escopo do MVP seja mantido sob controle;
- As funcionalidades críticas sejam priorizadas nas primeiras iterações;
- A equipe mantenha comunicação frequente com o cliente;
- O desenvolvimento tenha uma abordagem incremental e com sequência de validações.

## 2.7 Benefícios Esperados

Com base no cenário de alto endividamento e na carência de educação financeira identificada, os benefícios do TLT finanças são:

### Benefícios para o Cliente (Rodrigo Atila)

- **Validação de Necessidades**: Obter uma ferramenta que valide e atenda às necessidades específicas de organização financeira do público que ele representa.

- **Solução Viável e de Qualidade**: Receber um produto técnico de alta qualidade, construído com uma arquitetura sólida que garanta segurança e escalabilidade.

- **Alinhamento de Escopo**: Garantia de que as funcionalidades entregues estão em conformidade com as prioridades definidas durante as iterações semanais.

### Benefícios para os Usuários

- **Organização e Controle em Tempo Real**: Substituição do caos das planilhas manuais por um ecossistema integrado que permite o acompanhamento claro de receitas e despesas em tempo real.

- **Redução de Dívidas e Custos**: Auxílio na eliminação de surpresas como faturas atrasadas, juros e parcelas indesejadas, ajudando a quebrar ciclos de endividamento crônico.

- **Acessibilidade e Usabilidade**: Uma plataforma gratuita, intuitiva e simplificada, projetada para exigir o mínimo de cliques e funcionar mesmo sem conexão com a internet.

- **Previsibilidade**: Capacidade de criar metas e limites de gastos, proporcionando uma visão exata do fluxo de caixa e planejamento mensal.

## 2.8 Intervenção Social

### Impactos Esperados

- **Maior organização financeira**: Espera-se que os usuários consigam acompanhar receitas, despesas e saldo de maneira mais estruturada, reduzindo o descontrole financeiro cotidiano.

- **Aumento da consciência financeira**: A visualização consolidada de gastos, histórico e gráficos pode estimular uma maior compreensão sobre hábitos de consumo e padrões de despesas.

- **Redução de endividamento e esquecimentos**: O registro contínuo de transações e o acompanhamento do fluxo de caixa podem auxiliar na redução de atrasos em pagamentos, juros e parcelas não planejadas.

- **Maior previsibilidade financeira**: A organização por metas, categorias e períodos pode contribuir para o planejamento mensal e a tomada de decisões financeiras mais conscientes.

- **Inclusão digital e acessibilidade**: O funcionamento offline, a interface simplificada e a gratuidade da plataforma ampliam o acesso para usuários com limitações de conectividade, baixa renda ou pouca familiaridade com tecnologias financeiras.

- **Apoio à autonomia do usuário**: A ferramenta busca fortalecer a capacidade do usuário de gerir suas próprias finanças sem depender exclusivamente de planilhas complexas ou acompanhamento externo.

### Efeitos Emergentes

- **Abandono progressivo do uso**: Existe o risco de usuários deixarem de utilizar a aplicação após um período inicial de engajamento, reduzindo os benefícios esperados.

- **Baixa adesão às rotinas de registro**: Como o sistema depende do registro frequente das movimentações, a falta de disciplina contínua pode comprometer a qualidade das análises e relatórios.

- **Subutilização de funcionalidades analíticas**: Usuários com baixa educação financeira podem utilizar apenas funções básicas, deixando de aproveitar relatórios, metas e gráficos.

- **Frustração por resultados não imediatos**: Alguns usuários podem esperar mudanças financeiras rápidas e perder motivação caso os benefícios dependam de acompanhamento contínuo e mudança de hábitos.

- **Problemas de confiança e privacidade**: Pode haver resistência relacionada ao armazenamento de informações financeiras pessoais, exigindo clareza sobre segurança e proteção de dados.

- **Dependência de sincronização offline/online**: Falhas ou inconsistências na sincronização podem afetar a percepção de confiabilidade do sistema e gerar receio no uso contínuo.

- **Mudanças comportamentais inesperadas**: O acompanhamento constante dos gastos pode gerar maior consciência financeira, mas também ansiedade ou excesso de controle em determinados perfis de usuário.
---
