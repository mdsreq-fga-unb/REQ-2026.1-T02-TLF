# 10. DoR e DoD

<a id="101-definition-of-ready-dor"></a>

## 10.1 Definition of Ready (DoR)

1. O item foi validado pelo cliente para garantir agregue valor ao produto, e apresentado na reunião de planejamento da iteração sem dúvidas em aberto, e sua descrição está registrada na Work Item List com título, contexto de negócio e comportamento esperado preenchidos, de forma que qualquer membro da equipe consiga implementá-lo sem solicitar esclarecimentos adicionais.
2. A equipe avaliou coletivamente que o item é realizável dentro da iteração corrente de sete dias, considerando os demais itens planejados e a distribuição de papéis da equipe.
3. As dependências técnicas do item foram identificadas, incluindo configurações de Supabase Auth, schemas do banco de dados via Prisma, endpoints de API e comportamento esperado do WatermelonDB quando aplicável, e estão disponíveis ou têm data de disponibilidade confirmada dentro da iteração.
4. Quando o item envolve interface com o usuário, existe ao menos um protótipo ou esboço aprovado pelo cliente Rodrigo Átila, disponível como referência no repositório ou na Work Item List no Trello.

<a id="DOD"></a>

| UC    | Validado pelo cliente (1) | Validado pela equipe (2) | Dependencias prontas (3) | Prototipo (4) |
| ----- | ------------------------- | ------------------------ | ------------------------ | ------------- |
| UC-01 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-02 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-04 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-05 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-06 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-07 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-08 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-09 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-10 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-11 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-12 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-16 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-17 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-18 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-19 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-20 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-21 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-25 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-26 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-27 | SIM                       | SIM                      | SIM                      | SIM           |
| UC-29 | SIM                       | SIM                      | SIM                      | SIM           |

## 10.2 Definition of Done (DoD)

Uma funcionalidade é considerada concluída quando todos os critérios abaixo forem satisfeitos:

1. Foram escritos testes unitários com Jest cobrindo os cenários principais e os casos de borda da funcionalidade, com cobertura mínima de 70% nas camadas de negócio, services e controllers no backend; hooks e funções utilitárias no frontend, excluindo componentes de interface de usuário.
2. O código passou por revisão de ao menos um outro membro da equipe via Pull Request no GitHub e foi aprovado antes do merge na branch principal.
3. Quando aplicável, os endpoints de backend criados ou alterados pela funcionalidade estão documentados e atualizados no Swagger, com descrição dos parâmetros, corpos de requisição e respostas possíveis.
4. Quando aplicável, o comportamento offline foi verificado: a funcionalidade opera corretamente sem conexão via WatermelonDB e os dados são sincronizados com o backend após restabelecimento da conexão.
5. A funcionalidade foi implementada e integrada de ponta a ponta e o aplicativo compila e executa sem erros ou crashes no ambiente de desenvolvimento, Expo Go ou build de desenvolvimento, após a integração da funcionalidade.

| Iteração    | Testado (1) | Revisado (2) | Documentado (3) | Offline funcional (4) | Integrada (5) |
| ----------- | ----------- | ------------ | --------------- | --------------------- | ------------- |
| Iteração 1  | -           | -            | -               | -                     | -             |
| Iteração 2  | -           | -            | -               | -                     | -             |
| Iteração 3  | SIM         | SIM          | SIM             | -                     | SIM           |
| Iteração 4  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 5  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 6  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 7  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 8  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 9  | SIM         | SIM          | SIM             | SIM                   | SIM           |
| Iteração 10 | SIM         | SIM          | SIM             | SIM                   | SIM           |

---
