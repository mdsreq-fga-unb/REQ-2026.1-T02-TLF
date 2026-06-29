## UC17 - Editar Orçamento

**Autor:** Usuário.
**Descrição:** Permite ao usuário modificar metas financeiras e limites de gastos existentes.  
**Pré-condições:** Usuário autenticado e existência de pelo menos uma meta ou orçamento cadastrado.  
**Pós-condições:** Meta ou orçamento atualizado e progresso recalculado.

**Fluxo Principal:**

1. Acessa a área de metas e seleciona o planejamento desejado.
2. Clica em "Editar" e modifica valores, prazos ou limites de categoria.
3. Confirma e o sistema valida os novos dados.
4. Sistema salva e atualiza o acompanhamento.

**Fluxos Alternativos:**

- **Edição Restrita ao Mês Vigente:** O usuário decide aplicar a alteração dos limites apenas para o mês atual (devido a um gasto atípico), mantendo a regra antiga para os meses futuros.

**Fluxos de Exceção:**

- Dados inválidos: sistema exibe erro e mantém os valores anteriores.
- Usuário cancela: alterações descartadas.

---

<a id="uc18-apagar-orcamento"></a>
