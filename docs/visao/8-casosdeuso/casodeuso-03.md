## UC03 - Recuperar Senha

**Autor:** Usuário.
**Descrição:** Permite ao usuário redefinir sua senha caso a tenha esquecido.  
**Pré-condições:** Usuário possui conta cadastrada e tem acesso ao e-mail vinculado.  
**Pós-condições:** Senha é atualizada e o usuário pode realizar login com a nova credencial.

**Fluxo Principal:**

1. Na tela de login, clica em "Esqueci minha senha".
2. Informa o e-mail cadastrado e o sistema valida.
3. Sistema envia link de recuperação.
4. Usuário acessa o link, informa e confirma nova senha.
5. Sistema valida os dados, atualiza a senha e redireciona para o login.

**Fluxos Alternativos:**

- **Recuperação via SMS:** Se o usuário tiver um telefone vinculado à conta, ele pode optar por receber um código (OTP) por SMS para redefinir a senha dentro do próprio aplicativo, em vez de acessar um link externo por e-mail.

**Fluxos de Exceção:**

- Email não cadastrado ou senha inválida: sistema exige correção.
- Falha no envio do e-mail ou link inválido/expirado: sistema informa erro ou solicita nova requisição.

**Regras de Negócio:**

- O link expira após um período definido e é de uso único.
- Senha deve atender critérios de segurança e senhas anteriores não podem ser reutilizadas.

---

<a id="uc04-visualizar-painel-inicial-sem-graficos"></a>
