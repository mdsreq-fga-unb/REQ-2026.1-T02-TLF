## UC13 - Criar Subcategoria de Transação

**Autor:** Usuário.
**Descrição:** Permite ao usuário criar uma subcategoria vinculada a uma categoria existente para detalhar melhor suas transações.  
**Pré-condições:** Usuário autenticado e existência de categoria pai.  
**Pós-condições:** Subcategoria criada e disponível para classificação de transações.

**Fluxo Principal:**

1. Acessa configurações de categorias e seleciona uma categoria pai.
2. Clica em "Nova subcategoria" e informa o nome.
3. Confirma e sistema valida unicidade dentro da categoria pai.
4. Sistema salva a subcategoria.

**Fluxos Alternativos:**

- **Conversão de Categoria Principal:** O usuário seleciona uma Categoria principal existente no painel geral e escolhe "Converter em subcategoria", selecionando em seguida qual será o novo "Pai" daquele agrupamento.

**Fluxos de Exceção:**

- Subcategoria já existente na mesma categoria pai: sistema exibe erro.
- Nome vazio: sistema solicita preenchimento.

---

<a id="uc14-editar-subcategoria-de-transacao"></a>
