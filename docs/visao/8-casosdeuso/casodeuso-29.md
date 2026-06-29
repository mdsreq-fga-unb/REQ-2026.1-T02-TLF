## UC29 - Receber Notificações de Alerta

**Autor:** Usuário.
**Descrição:** Notificação de limites de gastos atingidos ou próximos de 80%.  
**Pré-condições:** Limite de gastos deve estar previamente definido.  
**Pós-condições:** Alertas enviados ao usuário por meio de notificações push ou dentro do sistema.

**Fluxo Principal:**

1. Sistema monitora os gastos do usuário em relação aos limites definidos.
2. Quando um limite é atingido ou está próximo de 80%, o sistema gera um alerta.
3. Usuário recebe a notificação no dispositivo ou na central de notificações do app.
4. Usuário pode tocar na notificação para ver detalhes.

**Fluxos Alternativos:**

- **Central in-app:** O usuário com permissões de Push desativadas (ou no modo Não Perturbe) acessa o histórico de limites estourados através de uma "Central de Avisos" representada pelo ícone de sino dentro do próprio aplicativo.

**Fluxos de Exceção:**

- Limite não configurado: sistema não envia notificação de limite.
- Permissão de notificação negada: sistema exibe alerta apenas internamente.

---

<a id="uc30-enviar-feedback"></a>
