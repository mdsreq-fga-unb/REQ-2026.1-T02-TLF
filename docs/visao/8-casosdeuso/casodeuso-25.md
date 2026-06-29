## UC25 - Registrar Transação Recorrente

**Autor:** Usuário.
**Descrição:** Permite ao usuário cadastrar uma transação que se repete periodicamente (assinaturas, salário, etc.).  
**Pré-condições:** Usuário autenticado.  
**Pós-condições:** Recorrência registrada e transações futuras serão geradas automaticamente.

**Fluxo Principal:**

1. Acessa "Recorrências" e clica em "Nova recorrência".
2. Informa dados da transação base: valor, tipo, categoria, frequência (diária, semanal, mensal, anual) e data de início.
3. Opcionalmente define data de término.
4. Confirma e o sistema valida e salva.

**Fluxos Alternativos:**

- **Recorrência em Dias Úteis:** O usuário assinala a opção de que, caso a data de vencimento caia no fim de semana, o sistema deve registrar e projetar a transação para o próximo dia útil subsequente.

**Fluxos de Exceção:**

- Frequência inválida ou data de término anterior ao início: sistema exibe erro.
- Valor zerado: sistema rejeita.

---

<a id="uc26-editar-transacao-recorrente"></a>
