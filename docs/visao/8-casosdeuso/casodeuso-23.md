## UC23 - Editar Conta de Instituição

**Autor:** Usuário.
**Descrição:** Permite modificar os dados de uma conta financeira registrada.  
**Pré-condições:** Usuário autenticado e conta existente.  
**Pós-condições:** Dados da conta atualizados.

**Fluxo Principal:**

1. Acessa a lista de contas e seleciona a conta.
2. Clica em "Editar" e modifica dados como saldo, descrição ou tipo.
3. Confirma e o sistema salva as alterações.

**Fluxos Alternativos:**

- **Reajuste Automático de Saldo:** O usuário não digita o saldo manualmente, optando por inserir o valor atual real de sua conta bancária, e o sistema cria uma transação de "Ajuste de Saldo" para igualar os valores de forma rastreável.

**Fluxos de Exceção:**

- Saldo editado não pode gerar inconsistências: sistema alerta sobre impacto no histórico.
- Usuário cancela: dados mantidos.

---

<a id="uc24-apagar-conta-de-instituicao"></a>
