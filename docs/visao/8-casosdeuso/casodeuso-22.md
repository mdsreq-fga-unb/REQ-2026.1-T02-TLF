## UC22 - Registrar Conta em Instituição

**Autor:** Usuário.
**Descrição:** Permite ao usuário registrar uma conta financeira (corrente, poupança, investimento) vinculada a uma instituição.  
**Pré-condições:** Usuário autenticado e instituição previamente cadastrada.  
**Pós-condições:** Conta registrada e saldo inicial configurado.

**Fluxo Principal:**

1. Acessa "Contas" e seleciona "Nova conta".
2. Escolhe a instituição e informa dados: tipo de conta, saldo inicial, descrição.
3. Confirma e o sistema valida.
4. Sistema salva a conta e a disponibiliza no painel.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Saldo inicial inválido: sistema exibe erro.
- Instituição não encontrada: sistema orienta cadastrar instituição primeiro.

---

<a id="uc23-editar-conta-de-instituicao"></a>
