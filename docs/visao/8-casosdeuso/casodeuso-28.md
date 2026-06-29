## UC28 - Exportar Relatórios CSV

**Autor:** Usuário.
**Descrição:** Permite exportar relatórios financeiros em formato CSV.  
**Pré-condições:** Usuário autenticado e existência de dados registrados.  
**Pós-condições:** Relatório gerado, exibido e disponibilizado para download.

**Fluxo Principal:**

1. Acessa a área de relatórios.
2. Escolhe o formato de exportação e confirma.
3. Sistema gera os gráficos/relatório e disponibiliza para download.
4. Usuário realiza o download do arquivo.

**Fluxos Alternativos:**

- **Compartilhamento Direto:** Após a geração do CSV, em vez do download para a pasta local, o sistema abre o modal nativo do dispositivo móvel para compartilhamento (ex: WhatsApp, Email ou Google Drive).

**Fluxos de Exceção:**

- Período inválido ou sem dados suficientes: sistema solicita correção ou emite aviso.
- Formato não suportado ou erro ao gerar/baixar: sistema informa falha.

---

<a id="uc29-receber-notificacoes-de-alerta"></a>
