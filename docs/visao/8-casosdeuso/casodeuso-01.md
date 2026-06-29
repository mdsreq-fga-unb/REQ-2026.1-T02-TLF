## UC01 - Cadastrar Usuário

**Autor:** Usuário.
**Descrição:** Permite ao usuário criar uma conta no sistema.  
**Pré-condições:** Usuário não deve estar cadastrado.  
**Pós-condições:** Conta criada com sucesso.

**Fluxo Principal:**

1. Acessa tela de cadastro.
2. Informa dados como nome, email e senha.
3. Confirma o cadastro.
4. Sistema valida os dados informados.
5. Sistema cria a conta.
6. Usuário é redirecionado para o login.

**Fluxos Alternativos:**

- Não existe

**Fluxos de Exceção:**

- Usuário ou email já cadastrado: sistema exibe erro.
- Dados inválidos: sistema solicita correção.

---

<a id="uc02-realizar-login"></a>
