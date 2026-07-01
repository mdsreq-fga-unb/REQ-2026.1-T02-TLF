## UC19 - Registrar Instituição Financeira

**Autor:** Usuário.
**Descrição:** Permite ao usuário cadastrar uma instituição financeira (banco, corretora, etc.) no sistema.  
**Pré-condições:** Usuário autenticado.  
**Pós-condições:** Instituição registrada e disponível para associação a contas.

**Fluxo Principal:**

1. Acessa "Instituições" no menu e clica em "Nova instituição".
2. Informa nome da instituição, tipo (banco, corretora, fintech) e, opcionalmente, logotipo.
3. Confirma e o sistema valida.
4. Sistema salva a instituição.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Instituição já cadastrada: sistema exibe erro.
- Dados incompletos: sistema solicita preenchimento.

**Imagem do Protótipo**

![UC19 - Registrar Instituição Financeira](../../images/prototipo-tlt/Add_Acount.png){: width="250" .center }

[Clique aqui para ver o protótipo completo.](../../entregas/prototipo.md)

---

<a id="uc20-editar-registro-de-instituicao"></a>
