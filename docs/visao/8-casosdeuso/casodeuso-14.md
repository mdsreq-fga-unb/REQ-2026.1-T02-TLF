## UC14 - Editar Subcategoria de Transação

**Autor:** Usuário.
**Descrição:** Permite modificar o nome de uma subcategoria existente.  
**Pré-condições:** Usuário autenticado e subcategoria existente.  
**Pós-condições:** Subcategoria renomeada e transações associadas atualizadas.

**Fluxo Principal:**

1. Acessa a lista de subcategorias dentro da categoria pai.
2. Seleciona a subcategoria e clica em "Editar".
3. Altera o nome e confirma.
4. Sistema valida e salva.

**Fluxos Alternativos:**

- **Mudar Categoria Pai:** Durante a edição, o usuário opta por transferir a subcategoria para uma nova Categoria Pai em vez de apenas renomeá-la.

**Fluxos de Exceção:**

- Novo nome já existe na mesma categoria pai: sistema rejeita.
- Usuário cancela: nome mantido.

---

<a id="uc15-apagar-subcategoria-de-transacao"></a>
