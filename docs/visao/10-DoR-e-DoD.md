# 8. DoR e DoD

## 8.1 Definition of Ready (DoR)

1. O item foi apresentado na reunião de planejamento da iteração sem dúvidas em aberto, e sua descrição está registrada na Work Item List com título, contexto de negócio e comportamento esperado preenchidos, de forma que qualquer membro da equipe consiga implementá-lo sem solicitar esclarecimentos adicionais.
2. Os critérios de aceitação estão escritos de forma objetiva e verificável, permitindo que qualquer membro da equipe confirme seu atendimento de forma independente, sem consultar o responsável pelo item.
3. A equipe avaliou coletivamente que o item é realizável dentro da iteração corrente de sete dias, considerando os demais itens planejados e a distribuição de papéis da equipe.
4. As dependências técnicas do item foram identificadas, incluindo configurações de Supabase Auth, schemas do banco de dados via Prisma, endpoints de API e comportamento esperado do WatermelonDB quando aplicável, e estão disponíveis ou têm data de disponibilidade confirmada dentro da iteração.
5. Quando o item envolve interface com o usuário, existe ao menos um protótipo ou esboço aprovado pelo cliente Rodrigo Átila em reunião de revisão, disponível como referência no repositório ou na Work Item List no Trello.
6. O item está associado a pelo menos um requisito funcional ou não funcional, ou um caso de uso documentado nas Listas de Requisitos de Software ou Casos de uso do projeto, garantindo rastreabilidade.
7. Não há decisões pendentes de alinhamento com o cliente nem aprovações de escopo em aberto que impeçam o início do desenvolvimento do item.
8. Um membro da equipe foi designado como responsável principal pela implementação do item, com registro na Work Item List.

## 8.2 Definition of Done (DoD)

Uma funcionalidade é considerada concluída quando todos os critérios abaixo forem satisfeitos:

1. O código foi implementado conforme os critérios de aceitação definidos no DoR e atende ao comportamento esperado descrito no requisito funcional correspondente.
2. Foram escritos testes unitários com Jest cobrindo os cenários principais e os casos de borda da funcionalidade, com cobertura mínima de 70% nas camadas de negócio, services e controllers no backend; hooks e funções utilitárias no frontend, excluindo componentes de interface de usuário.
3. O código passou por revisão de ao menos um outro membro da equipe via Pull Request no GitHub e foi aprovado antes do merge na branch principal.
4. Quando aplicável, os endpoints de backend criados ou alterados pela funcionalidade estão documentados e atualizados no Swagger, com descrição dos parâmetros, corpos de requisição e respostas possíveis.
5. Quando aplicável, o comportamento offline foi verificado: a funcionalidade opera corretamente sem conexão via WatermelonDB e os dados são sincronizados com o backend após restabelecimento da conexão.
6. Os dados pessoais e financeiros manipulados pela funcionalidade não são acessíveis sem autenticação ativa via Supabase Auth, não são armazenados em texto puro no banco de dados, não aparecem em logs de console em ambiente de produção e não são transmitidos sem criptografia entre cliente e servidor.
7. O aplicativo compila e executa sem erros ou crashes no ambiente de desenvolvimento, Expo Go ou build de desenvolvimento, após a integração da funcionalidade.
8. A rastreabilidade do item foi atualizada na Lista de Requisitos de Software do projeto, confirmando que o RF ou RNF correspondente foi implementado conforme declarado, incluindo eventuais ajustes acordados com o cliente durante a iteração.

---