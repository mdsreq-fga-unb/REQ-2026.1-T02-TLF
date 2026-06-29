## UC08 - Editar Transação

**Autor:** Usuário.
**Descrição:** Permite ao usuário modificar os dados de uma transação financeira registrada anteriormente.  
**Pré-condições:** Usuário autenticado e existência de pelo menos uma transação.  
**Pós-condições:** Transação atualizada e saldo recalculado.

**Fluxo Principal:**

1. Acessa a lista de transações e seleciona a transação desejada.
2. Clica em "Editar" e o sistema exibe os dados atuais em um formulário editável.
3. Usuário altera os campos desejados (valor, tipo, categoria, data).
4. Confirma a edição e o sistema valida os novos dados.
5. Sistema salva as alterações e atualiza o saldo.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Dados inválidos ou campos vazios: sistema exibe erro e solicita correção.
- Transação não encontrada: sistema exibe mensagem informativa.
- Usuário cancela a edição: alterações são descartadas.

---

<a id="uc09-deletar-transacao"></a>
