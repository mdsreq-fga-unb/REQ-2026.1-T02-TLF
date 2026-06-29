## UC21 - Apagar Registro de Instituição

**Autor:** Usuário.
**Descrição:** Permite remover uma instituição financeira do sistema.  
**Pré-condições:** Usuário autenticado e instituição sem contas vinculadas ativas.  
**Pós-condições:** Instituição removida do cadastro.

**Fluxo Principal:**

1. Acessa a lista de instituições e seleciona a instituição.
2. Clica em "Excluir" e o sistema verifica vínculos com contas.
3. Sistema solicita confirmação e usuário confirma.
4. Sistema remove a instituição.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Instituição com contas vinculadas: sistema bloqueia exclusão e orienta remover contas primeiro.
- Usuário cancela: instituição mantida.

---

<a id="uc22-registrar-conta-em-instituicao"></a>
