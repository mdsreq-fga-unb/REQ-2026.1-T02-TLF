## UC30 - Enviar Feedback

**Autor:** Usuário.
**Descrição:** Permite enviar feedback, reportar erros ou sugerir melhorias para o app TLT Finanças.  
**Pré-condições:** Usuário autenticado.  
**Pós-condições:** Feedback registrado e confirmação de envio exibida ao usuário.

**Fluxo Principal:**

1. Acessa "Enviar feedback", seleciona o tipo (erro, sugestão, elogio) e descreve o problema/sugestão.
2. Opcionalmente, anexa arquivos/imagens e confirma.
3. Sistema valida, registra o feedback e exibe a confirmação de envio.

**Fluxos Alternativos:**

- **Envio de Log de Diagnóstico Automático:** Após uma falha fatal (crash), ao reiniciar o app o sistema detecta o ocorrido e sugere o envio de um relatório gerado automaticamente contendo os rastros da falha (stack trace), exigindo apenas o consentimento do usuário.

**Fluxos de Exceção:**

- Descrição vazia ou arquivo grande/inválido: sistema exibe erro.
- Falha no envio: sistema sugere tentar novamente mais tarde.

---

<a id="uc31-visualizar-dicas-financeiras"></a>
