# ✅ Checklist de Qualidade para Testes

Valide seu teste antes de submeter usando este checklist.

---

## 🔧 Fase 1: Pré-execução

### Configuração do Ambiente

- [ ] Variáveis de ambiente configuradas (`.env.sistema1`, `.env.sistema2`)
- [ ] Credenciais válidas e atualizadas
- [ ] Conectividade com sistemas testada
- [ ] Node.js e Playwright instalados (`npm install`)
- [ ] npm scripts funcionando (`npm run test`)

### Estrutura do Projeto

- [ ] Pasta `tests/` existe e está organizada
- [ ] Pasta `tests/evidencias/` preparada
- [ ] Arquivos de documentação em `docs/`
- [ ] `.gitignore` configurado para `.env.*`

---

## 🎯 Fase 2: Durante o Desenvolvimento

### Seletores (80% da qualidade)

- [ ] **>= 80%** dos seletores em Prioridade 1 (getByRole, getByLabel, getByPlaceholder, getByTestId)
- [ ] **<= 15%** em Prioridade 2 (atributos semânticos)
- [ ] **<= 5%** em Prioridade 3 (fallbacks com .or())
- [ ] **0%** usando anti-padrões:
  - [ ] ❌ IDs hardcoded (`#id123`)
  - [ ] ❌ Classes geradas (`.css-abc123`)
  - [ ] ❌ Posicional (`.first()`, `:nth-child()`)

### Padrões de Código

- [ ] Regex sempre **case-insensitive**: `/texto/i`
- [ ] Cada ação dentro de `test.step()`
- [ ] Validação de estado **antes de cada ação**: `expect().toBeVisible()`
- [ ] **ZERO** `waitForTimeout()` - usar apenas asserts sincronizados
- [ ] Credenciais via `.env.*`, **NUNCA hardcoded**

### Evidências

- [ ] Helper importado: `import { createEvidenciaHelper } from '../helpers/evidencia-helper'`
- [ ] Evidências capturadas em pontos críticos:
  - [ ] Login realizado
  - [ ] Ações principais completadas
  - [ ] Erros/alertas (se houver)
- [ ] Nomenclatura padronizada: `01-descricao.png`, `02-descricao.png`

### Código Limpo

- [ ] Sem comentários desnecessários
- [ ] Variáveis com nomes descritivos
- [ ] Sem código comentado (remover em vez de comentar)
- [ ] Sem imports não utilizados
- [ ] Sem magic numbers (usar constantes)

---

## 🚀 Fase 3: Validação Antes de Submeter

### Execução Local

```bash
# Executar seu teste 3 vezes
npm run test seu-teste.spec.ts

# Verificar modo headless
npm run test seu-teste.spec.ts -- --headed=false

# Ver relatório
npm run report
```

- [ ] Teste passa 3 vezes consecutivas
- [ ] Funciona em modo **headless**
- [ ] Tempo de execução **< 5 min** (para testes simples)
- [ ] Seletores são **estáveis** (não quebram com pequenas mudanças na UI)

### Fechamento Obrigatório

- [ ] Navegador é fechado via `mcp_playwright_browser_close` ao final
- [ ] Confirmação de fechamento recebida
- [ ] Evidências salvas corretamente em `tests/evidencias/{sistema}/`
- [ ] Logs finais sem erros ou warnings

### Segurança

- [ ] **NENHUMA** credencial hardcoded no código
- [ ] **NENHUMA** credencial em variáveis globais
- [ ] Arquivo `.env.*` está no `.gitignore`
- [ ] Não há arquivo `.env` com credenciais reais commitado

---

## 📊 Fase 4: Métricas de Qualidade

### Taxa de Sucesso

- [ ] > = 95% em 10 execuções consecutivas
- [ ] Funciona tanto modo **headless** quanto **headed**
- [ ] Funciona em **diferentes máquinas** (não é ambiente-específico)

### Estabilidade

- [ ] Tempo médio de execução **consistente** (±10%)
- [ ] **Zero dependência** de `waitForTimeout()`
- [ ] Seletores não quebram com:
  - [ ] Diferentes resoluções de tela
  - [ ] Temas visuais diferentes
  - [ ] Idiomas diferentes (se aplicável)

### Manutenibilidade

- [ ] Código é **legível** (entendível em primeira leitura)
- [ ] Estrutura de pastas **organizada**
- [ ] Documentação de **variáveis especiais** (se houver)
- [ ] Fácil de **estender** para novos cenários

---

## 🔍 Checklist Específico por Tipo de Teste

### Testes de Login

- [ ] Credenciais chegam de `.env.*`
- [ ] Login com dados válidos passa
- [ ] Login com dados inválidos fail (esperado)
- [ ] Página pós-login é diferente de pré-login
- [ ] Logout funciona corretamente

### Testes de Formulário

- [ ] Campos obrigatórios são validados
- [ ] Mensagens de erro aparecem em português claro
- [ ] Submissão bem-sucedida redireciona/atualiza página
- [ ] Validação de formato (email, CPF, data, etc)
- [ ] Form mantém valores em caso de erro

### Testes de Tabela/Grid

- [ ] Busca/filtro funciona
- [ ] Paginação (se houver) funciona
- [ ] Classificação (se houver) funciona
- [ ] Ações por linha (editar, deletar) funcionam
- [ ] Mensagens de vazio aparecem quando apropriado

### Testes de Modal

- [ ] Modal abre visualmente
- [ ] Modal pode ser fechado (X, Cancelar, etc)
- [ ] Ação dentro do modal funciona
- [ ] Modal fecha após conclusão da ação
- [ ] Fundo é desabilitado enquanto modal está aberto

---

## 🚨 Red Flags - PARE e Revise

Se seu teste tem **qualquer um** destes sinais:

**CÓDIGO:**

- ❌ `waitForTimeout()` sem sincronização
- ❌ `page.locator('#id123')` - ID hardcoded
- ❌ `.first()`, `:nth-child()` - Seletor por posição
- ❌ Credenciais em variáveis JavaScript
- ❌ Código comentado em vez de removido

**TESTES:**

- ❌ Testes que falham esporadicamente
- ❌ Funciona com headed, falha com headless
- ❌ Leva > 10 minutos para completar
- ❌ Deixa janelas do navegador abertas

**EVIDÊNCIAS:**

- ❌ Nenhuma evidência sendo gerada
- ❌ Nomenclatura inconsistente
- ❌ Pasta de evidências não criada

**SEGURANÇA:**

- ❌ Credenciais visíveis no console/logs
- ❌ Arquivo `.env` commitado no Git
- ❌ Usar credenciais de produção em testes

**Revise e corrija ANTES de considerar pronto!**

---

## ✨ Antes de Commitar

```bash
# 1. Executar teste localmente
npm run test seu-teste.spec.ts

# 2. Verificar cobertura (se aplicável)
npm run test -- --reporter=coverage

# 3. Revisar logs
npm run test seu-teste.spec.ts -- --debug

# 4. Validar que nenhuma credencial está exposta
grep -r "password\|user\|token" src/ tests/ --include="*.ts" --exclude="*.env*"

# 5. Revisar arquivo de teste
code seu-teste.spec.ts  # Último check visual

# 6. Commitar com mensagem clara
git add seu-teste.spec.ts
git commit -m "test: adicionar teste de login do sistema1"
```

---

## 📈 Melhoria Contínua

### Após Cada Teste

- [ ] Documentar descobertas importantes
- [ ] Atualizar documentação se fez algo novo
- [ ] Compartilhar aprendizados com o time

### Periodicamente (Sprint/Quinzena)

- [ ] Revisar testes que falharam
- [ ] Identificar seletores frágeis
- [ ] Otimizar testes mais lentos
- [ ] Atualizar prompts com novos padrões

---

## 🎓 Referência Rápida

| Aspecto         | Bom ✅                        | Ruim ❌                  |
| --------------- | ----------------------------- | ------------------------ |
| **Seletores**   | `getByRole()`, `getByLabel()` | `page.locator('#id123')` |
| **Espera**      | `expect().toBeVisible()`      | `wait(5000)`             |
| **Estrutura**   | `test.step('descrição')`      | Código solto             |
| **Evidências**  | Em pontos críticos            | Nenhuma ou excesso       |
| **Credenciais** | Via `.env.*`                  | Hardcoded no código      |
| **Regex**       | `/padrão/i`                   | `/Padrão/`               |
