## UC24 - Apagar Conta de Instituição

**Autor:** Usuário.
**Descrição:** Permite apagar o registro de uma conta financeira cadastrada.  
**Pré-condições:** Usuário autenticado e conta existente.  
**Pós-condições:** Conta apagada.

**Fluxo Principal:**

1. Acessa a lista de contas e seleciona a conta.
2. Clica em "Apagar".
3. Sistema solicita confirmação e usuário confirma.
4. Sistema remove a conta.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Usuário cancela: item mantido.
- Erro ao excluir: sistema exibe mensagem de falha.

---

<a id="uc25-registrar-transacao-recorrente"></a>
