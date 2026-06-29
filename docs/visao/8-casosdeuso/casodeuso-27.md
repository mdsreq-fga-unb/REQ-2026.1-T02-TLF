## UC27 - Apagar Transação Recorrente

**Autor:** Usuário.
**Descrição:** Permite cancelar uma recorrência, interrompendo a geração de transações futuras.  
**Pré-condições:** Usuário autenticado e recorrência existente.  
**Pós-condições:** Recorrência removida; transações futuras não serão mais geradas.

**Fluxo Principal:**

1. Acessa lista de recorrências e seleciona a recorrência.
2. Clica em "Excluir" e sistema pergunta como lidar com transações já geradas, se mantem ou remove todas.
3. Usuário escolhe manter ou remover instâncias futuras e confirma.
4. Sistema processa a exclusão.

**Fluxos Alternativos:**

- **Pausar Recorrência:** O usuário decide pausar a assinatura indefinidamente, interrompendo as previsões futuras sem remover a configuração matriz para fácil reativação no futuro.

**Fluxos de Exceção:**

- Usuário cancela: recorrência mantida.
- Erro ao remover instâncias: sistema notifica falha parcial.

---

<a id="uc28-exportar-relatorios-csv"></a>
