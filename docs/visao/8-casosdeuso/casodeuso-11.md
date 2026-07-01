## UC11 - Editar Categoria de Transação

**Autor:** Usuário.
**Descrição:** Permite ao usuário modificar o nome ou aparência de uma categoria existente.  
**Pré-condições:** Usuário autenticado e existência de pelo menos uma categoria.  
**Pós-condições:** Categoria atualizada e alterações refletidas nas transações associadas.

**Fluxo Principal:**

1. Acessa a lista de categorias e seleciona a categoria desejada.
2. Clica em "Editar" e altera o nome, ícone ou cor.
3. Confirma a edição e o sistema valida.
4. Sistema salva as alterações.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Novo nome já utilizado por outra categoria: sistema exibe erro.
- Categoria padrão do sistema: edição limitada (apenas cor/ícone).
- Usuário cancela: alterações descartadas.

**Imagem do Protótipo**

![UC11 - Selecionar Categoria](../../images/prototipo-tlt/Select_Category.png){: width="250" }
![UC11 - Editar Categoria de Transação](../../images/prototipo-tlt/Edit_Category.png){: width="250" }
{: .img-row }

[Clique aqui para ver o protótipo completo.](../../entregas/prototipo.md)

---

<a id="uc12-apagar-categoria-de-transacao"></a>
