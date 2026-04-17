# ✅ Checklist de Qualidade para Testes

Use este checklist antes de executar testes para garantir máxima qualidade e consistência.

## 🔧 **Pré-execução**

### **Configuração do Ambiente**

- [ ] Variáveis de ambiente configuradas (ver `CONFIGURACAO_AMBIENTE.md`)
- [ ] Credenciais válidas e atualizadas
- [ ] Conectividade com os sistemas testada
- [ ] Playwright atualizado para versão mais recente

### **Estrutura do Projeto**

- [ ] Pasta `tests/evidencias/{sistema}` existe
- [ ] Arquivo `prompts/modelo_padrao.md` está acessível
- [ ] Dependencies do projeto instaladas (`npm install`)

## 🎯 **Durante o Desenvolvimento**

### **Seletores Robustos**

- [ ] Prioridade 1: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`
- [ ] Prioridade 2: Atributos semânticos (`[aria-label]`, `[title]`, `[data-*]`)
- [ ] Prioridade 3: Seletores com fallbacks múltiplos
- [ ] ❌ **Evitado**: IDs hardcoded, classes voláteis, seletores por índice

### **Padrões de Código**

- [ ] Regex sempre case-insensitive: `/texto/i`
- [ ] Cada ação dentro de `test.step()`
- [ ] Validação de estado antes de ações: `expect().toBeVisible()`
- [ ] ❌ **Evitado**: `waitForTimeout()` para sincronização

### **Evidências**

- [ ] Helper importado: `import { createEvidenciaHelper } from '../helpers/evidencia-helper'`
- [ ] Evidências em pontos críticos (login, ações principais, erros)
- [ ] Nomenclatura padronizada: `01-timestamp-descricao.png`

## 🚀 **Pós-execução**

### **Finalização Obrigatória**

- [ ] Navegador fechado com `mcp_playwright_browser_close`
- [ ] Confirmação de fechamento recebida
- [ ] Evidências salvas corretamente
- [ ] Logs limpos sem erros

### **Validação**

- [ ] Teste executado pelo menos 3 vezes com sucesso
- [ ] Funciona em modo headless
- [ ] Tempo de execução razoável (< 5 min para cenários simples)
- [ ] Seletores estáveis (não quebram com pequenas mudanças na UI)

## 📊 **Métricas de Qualidade**

### **Seletores**

- [ ] > = 80% dos seletores usando prioridade 1 (semânticos)
- [ ] <= 20% usando prioridade 3 (fallbacks)
- [ ] 0% usando anti-padrões (IDs hardcoded, classes voláteis)

### **Estabilidade**

- [ ] Taxa de sucesso >= 95% em 10 execuções
- [ ] Tempo médio de execução consistente
- [ ] Zero dependência de `waitForTimeout()`

### **Manutenibilidade**

- [ ] Código comentado nos pontos complexos
- [ ] Variáveis de ambiente documentadas
- [ ] Estrutura de pastas organizada

## 🔍 **Checklist por Sistema**

### **Sistema Genérico**

- [ ] Login funcional com credenciais do ambiente
- [ ] Navegação pelos menus principais
- [ ] Filtros e pesquisas respondem corretamente
- [ ] Logout limpo
- [ ] Funcionalidades CRUD validadas
- [ ] Mensagens de confirmação e feedbacks aparecem
- [ ] Modais e diálogos abrem e fecham corretamente

## 🚨 **Red Flags - Pare e Revise**

- ❌ Uso de `waitForTimeout()`
- ❌ Seletores como `#id123` ou `.class-generated-abc`
- ❌ Testes que falham esporadicamente
- ❌ Evidências não sendo geradas
- ❌ Navegador não sendo fechado
- ❌ Credenciais hardcoded no código

## 📈 **Melhoria Contínua**

### **Após cada sprint**

- [ ] Revisar seletores que falharam
- [ ] Atualizar prompts com novos padrões descobertos
- [ ] Documentar novos elementos encontrados
- [ ] Compartilhar aprendizados com o time

### **Monitoramento**

- [ ] Acompanhar taxa de sucesso dos testes
- [ ] Identificar pontos de instabilidade
- [ ] Otimizar testes mais lentos
- [ ] Revisar cobertura de cenários críticos
