# 3 ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE

## 3.1 Estratégia Priorizada

**Abordagem de Desenvolvimento de Software**: Híbrida

**Ciclo de vida**: Iterativo e incremental

**Processo de Engenharia de Software**: OpenUP

**Framework**: Scrum (com adaptações do OpenUP)

## 3.2 Quadro Comparativo

| Características | OpenUP | RAD (Rapid Application Development) |
|-----------------|--------|-------------------------------------|
| **Abordagem Geral** | Iterativo e incremental, com foco em arquitetura e organização do processo. | Iterativo com forte foco em prototipação rápida e entregas ágeis. |
| **Foco em Arquitetura** | Forte ênfase na definição de uma arquitetura sólida (baseada em riscos) desde as fases iniciais. | Baixo foco inicial em arquitetura, priorizando a rapidez na construção de protótipos funcionais. |
| **Estrutura de Processos** | Estruturado em fases (Iniciação/Concepção, Elaboração, Construção e Transição). | Estrutura flexível baseada em ciclos curtos de planejamento, workshop de design e prototipagem. |
| **Flexibilidade de Requisitos** | Requisitos detalhados conforme a necessidade, priorizando os de alto risco/prioridade. | Alta flexibilidade; os requisitos emergem e evoluem através da prototipagem e feedback constante. |
| **Colaboração com Cliente** | Envolvimento frequente em revisões, demonstrações e validações de marcos. | Colaboração intensa e contínua; exige compromisso total dos usuários nos workshops e revisões. |
| **Complexidade do Processo** | Moderada; é uma versão simplificada do UP, mas mantém papéis e artefatos definidos. | Baixa; processo ágil e direto com foco em velocidade e menor formalidade documental. |
| **Qualidade Técnica** | Alta; garantida pelo foco em arquitetura, requisitos significativos e validação progressiva. | Variável; o foco em velocidade e interfaces pode levar à negligência de aspectos não-funcionais. |
| **Práticas de Desenvolvimento** | Uso de modelagem visual, quando necessária, e práticas arquiteturais integradas ao ágil. | Uso intensivo de prototipação evolutiva e ferramentas de desenvolvimento rápido (CASE/Low-code). |
| **Adaptação ao Projeto TLT Finanças** | Adequado para sistemas com requisitos de conformidade moderados e necessidade de escalabilidade. | Útil para validação de conceitos iniciais, mas limitado para sistemas financeiros críticos ou complexos. |
| **Documentação** | Documentação enxuta e mínima (Visão, Lista de Requisitos, Casos de Uso simplificados). | Documentação mínima, focada em design de interface, fluxos de dados e modelos de dados. |
| **Controle de Qualidade** | Realizado por meio de validações contínuas, testes e revisões com stakeholders. | Baseado na validação imediata de protótipos funcionais e feedback direto do usuário. |
| **Escalabilidade** | Adequado para projetos de médio porte e passível de adaptação para maior escala. | Mais indicado para projetos de pequeno/médio porte ou sistemas de informação corporativos. |
| **Suporte a Equipes de Desenvolvimento** | Otimizado para equipes pequenas e co-localizadas tipicamente 3 a 10 pessoas | Exige equipes pequenas, altamente colaborativas e com ferramentas de desenvolvimento rápido. |

## 3.3 Justificativa

Com base nas características do projeto TLT Finanças e na comparação apresentada na seção anterior, a equipe optou pelo OpenUP como processo de Engenharia de Software mais adequado para orientar o desenvolvimento da solução. Essa escolha se justifica pelo fato de o produto tratar de um domínio sensível, gestão financeira pessoal, no qual organização, rastreabilidade, segurança e qualidade técnica são requisitos centrais do sistema. O próprio escopo do projeto prevê funcionalidades como painel financeiro consolidado, registro e acompanhamento de transações, persistência offline com sincronização automática, segurança de dados e incentivo à educação financeira, o que exige uma base arquitetural minimamente sólida desde o início.

O OpenUP se mostra mais aderente porque combina abordagem iterativa e incremental com maior ênfase em arquitetura, validação progressiva e documentação enxuta, o que favorece a construção de um MVP consistente sem perder o controle técnico da solução. Isso é especialmente importante no TLT Finanças, já que o projeto envolve integração de dados sensíveis, uso de tecnologias específicas e necessidade de manter a confiabilidade das informações financeiras do usuário. Além disso, o processo prioriza requisitos conforme risco e valor de negócio, o que permite concentrar o esforço inicial nas funcionalidades mais relevantes para o objetivo do produto.

Embora o RAD ofereça rapidez na prototipação e validação de interface, ele tende a ser menos apropriado para um sistema como o proposto, pois privilegia velocidade de entrega em detrimento de uma estrutura arquitetural mais robusta. No caso do TLT Finanças, isso poderia comprometer aspectos como persistência confiável, segurança, escalabilidade e evolução ordenada do produto ao longo das sprints. Assim, o RAD é útil como apoio em etapas pontuais de representação e validação visual, mas não como processo principal de desenvolvimento.

Dessa forma, a escolha do OpenUP se fundamenta no equilíbrio entre controle técnico, evolução incremental e foco em valor de negócio, atendendo melhor às necessidades do projeto e aos desafios identificados, como a baixa educação financeira dos usuários, a necessidade de usabilidade intuitiva e a entrega de uma solução funcional dentro do prazo do semestre.

---
