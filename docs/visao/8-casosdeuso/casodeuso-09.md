## UC09 - Deletar Transação

**Autor:** Usuário.
**Descrição:** Permite ao usuário excluir uma transação financeira registrada.  
**Pré-condições:** Usuário autenticado e existência de pelo menos uma transação.  
**Pós-condições:** Transação removida e saldo atualizado corretamente.

**Fluxo Principal:**

1. Acessa a lista de transações, seleciona uma e clica em "Excluir".
2. Sistema solicita confirmação da ação e o usuário confirma.
3. Sistema remove a transação, atualiza o saldo e exibe mensagem de sucesso.

**Fluxos Alternativos:**

- **Exclusão em Lote:** O usuário ativa o modo de seleção, marca várias transações simultaneamente e clica em "Excluir" para remover todas de uma só vez com apenas uma confirmação.

**Fluxos de Exceção:**

- Transação não encontrada ou erro ao excluir: sistema exibe falha.
- Usuário cancela a operação: exclusão interrompida.

---

<a id="uc10-criar-categoria-de-transacao"></a>
