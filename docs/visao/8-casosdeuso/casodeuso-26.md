## UC26 - Editar Transação Recorrente

**Autor:** Usuário.
**Descrição:** Permite modificar uma recorrência existente.  
**Pré-condições:** Usuário autenticado e recorrência cadastrada.  
**Pós-condições:** Recorrência atualizada; alterações podem afetar transações futuras ou todas as instâncias.

**Fluxo Principal:**

1. Acessa lista de recorrências e seleciona a desejada.
2. Clica em "Editar" e modifica os campos valor, tipo, categoria, frequência (diária, semanal, mensal, anual) e data de início.
3. Sistema pergunta se a alteração se aplica a todas as instâncias ou apenas às futuras.
4. Usuário escolhe e confirma; sistema salva.

**Fluxos Alternativos:**

- **Pular Ocorrência:** O usuário opta apenas por pular ou ignorar a ocorrência do mês atual, mantendo as configurações gerais e a programação ativa para o mês subsequente.

**Fluxos de Exceção:**

- Alteração retroativa pode causar inconsistências: sistema alerta.
- Usuário cancela: recorrência mantida.

---

<a id="uc27-apagar-transacao-recorrente"></a>
