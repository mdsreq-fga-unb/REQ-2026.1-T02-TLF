## UC15 - Apagar Subcategoria de Transação

**Autor:** Usuário.
**Descrição:** Permite remover uma subcategoria do sistema.  
**Pré-condições:** Usuário autenticado e subcategoria existente.  
**Pós-condições:** Subcategoria removida; transações associadas reclassificadas para a categoria pai ou outra escolhida.

**Fluxo Principal:**

1. Acessa a lista de subcategorias e seleciona a subcategoria.
2. Clica em "Excluir" e sistema verifica transações vinculadas.
3. Sistema oferece opção de mover transações para categoria pai ou outra subcategoria.
4. Usuário escolhe e confirma; sistema remove a subcategoria.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Usuário cancela: subcategoria mantida.
- Erro ao reclassificar: sistema notifica e aborta.

---

<a id="uc16-criar-orcamento"></a>
