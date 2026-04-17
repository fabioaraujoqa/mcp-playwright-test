# 🎤 MCP Playwright Test – Documentação de Apresentação

> Template Profissional de Automação com Playwright + MCP

---

## 📊 Slide 1: Visão Geral

### O Projeto

**MCP Playwright Test** é um framework completo de automação de testes com Playwright, seguindo boas práticas industriais, padrões robustos e arquitetura escalável.

### Destaques

```
✅ Padrões robustos de seletores (3 níveis de prioridade)
✅ Segurança: Variáveis de ambiente (.env.*)
✅ Qualidade: Helper de evidências e checklist completo
✅ Escalabilidade: Modular e fácil de estender
✅ Documentação: 5 markdown files profissionais
✅ Automação: Scripts bash para setup e testes
✅ Real-world: Pronto para usar em produção
```

---

## 📊 Slide 2: Arquitetura

```
┌─────────────────────────────────────────┐
│   📖 Documentação (docs/)               │
│  ├─ 00-ARQUITETURA.md                  │
│  ├─ 01-BOAS_PRATICAS.md                │
│  ├─ 02-SELETORES_ROBUSTOS.md           │
│  ├─ 03-VARIAVEIS_AMBIENTE.md           │
│  └─ 04-CHECKLIST_QUALIDADE.md          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   🧪 Testes (tests/)                    │
│  ├─ helpers/                            │
│  │  └─ evidencia-helper.ts              │
│  ├─ sistema1/                           │
│  │  └─ exemplo-login.spec.ts            │
│  ├─ sistema2/                           │
│  └─ evidencias/ (runtime)               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   🔧 Configuração                       │
│  ├─ package.json (scripts npm)          │
│  ├─ playwright.config.ts (Playwright)   │
│  ├─ tsconfig.json (TypeScript)          │
│  ├─ .env.example (template)             │
│  └─ .gitignore (segurança)              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   🚀 Automação (scripts/)               │
│  ├─ setup.sh (setup inicial)            │
│  └─ run-tests.sh (menu interativo)      │
└─────────────────────────────────────────┘
```

---

## 📊 Slide 3: Seletores Robustos

### Hierarquia de Prioridade (80-15-5 Rule)

**🥇 Prioridade 1: Acessibilidade (80%)**

- `getByRole()` - Mais semântico
- `getByLabel()` - Com label
- `getByPlaceholder()` - Com placeholder
- `getByTestId()` - data-testid

```typescript
page.getByRole('button', { name: /entrar/i });
page.getByLabel(/email/i);
page.getByTestId('user-menu');
```

**🥈 Prioridade 2: Semântica (15%)**

- `[aria-label]` - Atributos de acessibilidade
- `[title]` - Tooltips
- `[data-*]` - Atributos de dados

```typescript
page.locator('[aria-label="Fechar"]');
page.locator('[title="Clique para editar"]');
```

**🥉 Prioridade 3: Fallbacks (5%)**

- Múltiplas estratégias com `.or()`
- Último recurso

```typescript
page
  .getByRole('button', { name: /sair/i })
  .or(page.locator('[aria-label="Logout"]'))
  .or(page.locator('.btn-logout'));
```

### ❌ Nunca Use

```typescript
// IDs hardcoded
page.locator('#btn-123')        ❌

// Classes geradas
page.locator('.css-abc123')     ❌

// Por posição
page.locator('button').first()  ❌
```

---

## 📊 Slide 4: Exemplo Prático de Teste

```typescript
test('deve fazer login com sucesso', async ({ page }, testInfo) => {
  const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema1');

  // Step 1: Navegar
  await test.step('Navegar até login', async () => {
    await page.goto(process.env.SISTEMA_BASE_URL!);
    await tiraFoto('01-pagina-login-carregada');
  });

  // Step 2: Preencher
  await test.step('Preencher credenciais', async () => {
    await page.getByLabel(/email/i).fill(process.env.SISTEMA_USER!);
    await page.getByLabel(/senha/i).fill(process.env.SISTEMA_PASSWORD!);
    await tiraFoto('02-credenciais-preenchidas');
  });

  // Step 3: Enviar
  await test.step('Clicar em Entrar', async () => {
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page).toHaveURL(/dashboard/);
    await tiraFoto('03-dashboard-carregado');
  });
});
```

**Características:**

- ✅ Variáveis de ambiente seguras
- ✅ Seletores robustos (Prioridade 1)
- ✅ test.step() para organizar
- ✅ expect() para sincronização (não waitForTimeout!)
- ✅ Evidências em pontos críticos

---

## 📊 Slide 5: Variáveis de Ambiente

### Segurança em Primeiro Lugar

**✅ Fazer:**

```bash
# Template (COMMITAR)
.env.example

# Credenciais (GITIGNORE)
.env.sistema1
.env.sistema2
```

**❌ Nunca fazer:**

```javascript
const password = 'senha123'; // ❌ NUNCA hardcode
```

### Arquivo `.env.sistema1`

```env
SISTEMA_BASE_URL=https://app.com.br
SISTEMA_USER=usuario@example.com
SISTEMA_PASSWORD=senha_123
SISTEMA_TIMEOUT=5000
SISTEMA_EVIDENCIAS_DIR=tests/evidencias/sistema1
```

### Uso no Teste

```typescript
import { loadEnv, validateEnv } from '../helpers/evidencia-helper';

test.beforeAll(() => {
  loadEnv('sistema1');
  validateEnv(['SISTEMA_BASE_URL', 'SISTEMA_USER', 'SISTEMA_PASSWORD']);
});

test('teste', async ({ page }) => {
  await page.goto(process.env.SISTEMA_BASE_URL!);
  await page.getByLabel(/email/i).fill(process.env.SISTEMA_USER!);
  // ...
});
```

---

## 📊 Slide 6: Evidências e Screenshots

### Helper Automático

```typescript
const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema1');

// Capturar e anexar automaticamente
await tiraFoto('01-login-realizado');
await tiraFoto('02-dados-preenchidos');
await tiraFoto('03-sucesso');
```

**Estrutura de Pastas:**

```
tests/evidencias/
  sistema1/
    01-2025-03-11T14-30-45-login-realizado.png
    02-2025-03-11T14-30-45-dados-preenchidos.png
    03-2025-03-11T14-30-45-sucesso.png
```

**Relatório HTML:**

- Screenshots anexadas automaticamente
- Organizado por teste
- Fácil de revisar falhas

---

## 📊 Slide 7: Scripts de Automação

### Setup Automático

```bash
bash scripts/setup.sh
```

**O que faz:**

1. ✅ Verifica Node.js
2. ✅ Instala dependências (npm install)
3. ✅ Instala browsers Playwright
4. ✅ Cria arquivos `.env.sistema1`
5. ✅ Cria pastas de evidências
6. ✅ Valida estrutura

### Menu de Testes

```bash
bash scripts/run-tests.sh
```

**Opções:**

1. Rodar todos os testes (headless)
2. Com navegador visível (headed)
3. Teste específico
4. Modo Debug
5. UI Mode (interativo)
6. Codegen (registrador)
7. Relatório HTML
8. Atualizar Snapshots
9. Testes em paralelo
10. Sair

---

## 📊 Slide 8: Qualidade e Validação

### Checklist de Qualidade

**Antes de submeter cada teste:**

```
✅ Teste passa 3x consecutivas
✅ Funciona em modo headless
✅ >= 80% seletores Prioridade 1
✅ Zero waitForTimeout()
✅ Nenhuma credencial hardcoded
✅ Evidências em pontos críticos
✅ Tempo < 5 minutos
```

### Métricas Esperadas

```
📊 Taxa de Sucesso: >= 95%
⏱️ Tempo de Execução: Consistente (±10%)
🔍 Estabilidade: Não quebra com pequenas mudanças na UI
📈 Manutenibilidade: Código legível, fácil de estender
```

---

## 📊 Slide 9: Documentação Completa

| Documento                     | Objetivo                              |
| ----------------------------- | ------------------------------------- |
| **00-ARQUITETURA.md**         | Visão geral, estrutura, convenções    |
| **01-BOAS_PRATICAS.md**       | Princípios, sincronização, padrões    |
| **02-SELETORES_ROBUSTOS.md**  | Hierarquia, estratégias, anti-padrões |
| **03-VARIAVEIS_AMBIENTE.md**  | Setup, segurança, troubleshooting     |
| **04-CHECKLIST_QUALIDADE.md** | Validação completa de testes          |

**Total:** 5 arquivos markdown com ~500KB de documentação profissional

---

## 📊 Slide 10: Demo – Quick Start

### 30 segundos para começar

```bash
# 1. Setup
bash scripts/setup.sh

# 2. Editar
code .env.sistema1

# 3. Rodar
npm test

# 4. Ver Relatório
npm run test:report
```

### Arquivo de Exemplo

**`tests/sistema1/exemplo-login.spec.ts`** – Pronto para usar com comentários detalhados

---

## 📊 Slide 11: Casos de Uso

### ✅ Ideal Para

- ✅ Testes E2E (End-to-End)
- ✅ Testes de Regressão
- ✅ Testes de Interface
- ✅ Automação de múltiplos sistemas
- ✅ Integração com CI/CD

### Exemplos Reais

```typescript
// Login em diferentes sistemas
✅ Teste de login (autenticação)
✅ Preenchimento de formulário (dados)
✅ Busca e filtro (navegação)
✅ Edição e deleção (CRUD)
✅ Modal e diálogo (integrações)
✅ Tabela e grid (complexidade)
```

---

## 📊 Slide 12: Roadmap & Futuro

### ✅ Já Implementado

- ✅ Estrutura de projeto profissional
- ✅ Padrões de seletores robustos
- ✅ Segurança com variáveis de ambiente
- ✅ Helper de evidências automáticas
- ✅ Documentação completa
- ✅ Scripts de automação
- ✅ Checklist de qualidade
- ✅ Exemplos prontos para usar

### 🚀 Possíveis Extensões

- 🔄 Integração com CI/CD (GitHub Actions, Jenkins)
- 📊 Dashboard de testes (Allure Report)
- 🔐 Vault para credenciais (1Password, Vault)
- ⚡ Execution paralela avançada
- 🌍 Testes em múltiplos navegadores
- 📱 Testes mobile

---

## 📊 Slide 13: Key Takeaways

```
🎯 PRIORIDADES

1️⃣ Seletores Robustos
   Usar getByRole(), getByLabel() (80%+)

2️⃣ Segurança
   Variáveis de ambiente, nunca hardcode

3️⃣ Sincronização
   expect() assertions, nunca waitForTimeout()

4️⃣ Evidências
   Capturar em pontos críticos

5️⃣ Qualidade
   Validar com checklist antes de submeter
```

---

## 📊 Slide 14: Referências & Links

- 📖 **Playwright**: https://playwright.dev/
- 🔗 **MCP Protocol**: https://code.visualstudio.com/docs/copilot/customization/mcp-servers
- 🐙 **Repo**: [seu-repositorio]
- 📚 **Documentação Local**: `/docs/*`

---

## 🎓 Conclusão

### Em Uma Frase

> "Framework completo, profissional e escalável para automação de testes com Playwright, seguindo boas práticas industriais e padrões robustos."

### Pronto Para

✅ Produção  
✅ Escalabilidade  
✅ Manutenção  
✅ Apresentação  
✅ Equipes

---

**Desenvolvido com ❤️ usando Playwright + MCP**
