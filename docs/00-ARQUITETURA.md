# 🏗️ Arquitetura do Projeto

Visão geral da estrutura, convenções e padrões do projeto.

---

## 📁 Estrutura de Diretórios

```txt
mcp-playwright-test/
│
├── 📄 .env.example                    # Template de variáveis de ambiente
├── 📄 .gitignore                      # Arquivos ignorados pelo Git
├── 📄 .vscode/
│   └── settings.json                  # Configuração do VS Code (MCP)
│
├── 📖 README.md                       # Documentação principal
├── 📄 package.json                    # Dependências e scripts npm
├── 📄 playwright.config.ts            # Configuração do Playwright
├── 📄 tsconfig.json                   # Configuração do TypeScript
│
├── 📚 docs/                           # Documentação do projeto
│   ├── 01-BOAS_PRATICAS.md           # Padrões de código
│   ├── 02-SELETORES_ROBUSTOS.md      # Estratégias de seletores
│   ├── 03-VARIAVEIS_AMBIENTE.md      # Guia de variáveis de ambiente
│   └── 04-CHECKLIST_QUALIDADE.md     # Validação de testes
│
├── 🧪 tests/                          # Testes automatizados
│   ├── helpers/
│   │   └── evidencia-helper.ts        # Helper de screenshots
│   │
│   ├── sistema1/                      # Testes do Sistema 1
│   │   └── exemplo-login.spec.ts      # Teste de exemplo
│   │
│   ├── sistema2/                      # Testes do Sistema 2 (se houver)
│   │   └── *.spec.ts
│   │
│   └── evidencias/                    # Screenshots (gerado em runtime)
│       ├── sistema1/
│       │   └── *.png
│       └── sistema2/
│           └── *.png
│
├── 🔧 scripts/                        # Scripts auxiliares
│   ├── setup.sh                       # Setup inicial
│   └── run-tests.sh                   # Menu interativo de testes
│
└── 📋 prompts/ (DEPRECATED)          # Arquivos antigos (migrar para docs)
    ├── CHECKLIST_QUALIDADE.md
    ├── ENVIRONMENT_VARIABLES.md
    ├── modelo_padrao.md
    └── modelo_seletores.md
```

---

## 📋 Convenções de Nomes

### Arquivos de Teste

```
{sistema}/{funcionalidade}-{tipo}.spec.ts
```

**Exemplos:**

- `sistema1/login-usuarios.spec.ts`
- `sistema2/criar-formulario.spec.ts`
- `sansys/buscar-vendas.spec.ts`

### Testes

```typescript
test('deve {ação} {para obter resultado}', async ({ page }) => {
  // Implementação
});
```

**Exemplos:**

```typescript
test('deve fazer login com credenciais válidas', async ...)
test('deve falhar ao fazer login com senha incorreta', async ...)
test('deve preencher formulário e submeter', async ...)
```

### Variáveis de Ambiente

```
NOMEDOSISTEMA_PROPRIEDADE=valor
```

**Padrão:**

```
SISTEMA_BASE_URL=...
SISTEMA_USER=...
SISTEMA_PASSWORD=...
SISTEMA_TIMEOUT=...
SISTEMA_EVIDENCIAS_DIR=...
```

**Exemplos:**

- `SANSYS_BASE_URL`
- `SALESFORCE_USER`
- `MERCADOLIVRE_TIMEOUT`

### Screenshots

```
{seq}-{timestamp}-{descricao}.png
```

**Exemplo:**

- `01-2025-03-11T14-30-45-login-realizado.png`
- `02-2025-03-11T14-30-45-dashboard-carregado.png`

---

## 📦 Dependências

### Principal

- **@playwright/test**: Framework de testes

### Desenvolvimento

- **typescript**: Tipagem estática
- **dotenv**: Variáveis de ambiente
- **eslint**: Linting
- **prettier**: Formatação

```bash
npm install
npm install --save-dev @types/node
```

---

## 🔄 Fluxo de Testes

```
┌─────────────────┐
│  npm install    │  Instalar dependências
└────────┬────────┘
         │
┌────────v────────┐
│ .env.sistema1   │  Copiar e editar variáveis
└────────┬────────┘
         │
┌────────v────────────────┐
│  npm test                │  Executar teste
└────────┬────────────────┘
         │
┌────────v──────────────────┐
│  Seletores robustos       │  teste procura elementos
│  1. getByRole()           │
│  2. getByLabel()          │
│  3. Atributos semânticos  │
└────────┬──────────────────┘
         │
┌────────v─────────────┐
│  expect() assertions │  Validação de estado
└────────┬─────────────┘
         │
┌────────v────────────┐
│  Screenshot captura │  Evidências
│  createEvidenciaHelper()
└────────┬────────────┘
         │
┌────────v──────────────────┐
│ tests/evidencias/sistema1/ │  Salvar screenshots
└────────┬──────────────────┘
         │
┌────────v────────────────┐
│ playwright-report/       │  Relatório HTML
└──────────────────────────┘
```

---

## 🔐 Segurança - Checklist

- [ ] `.env.*` está no `.gitignore`
- [ ] Nenhuma credencial em JavaScript
- [ ] Variáveis usam `process.env.*`
- [ ] `.env.example` é template genérico
- [ ] Credenciais compartilhadas seguramente

---

## 🚀 Scripts Disponíveis

### Setup

```bash
bash scripts/setup.sh          # Setup automático
```

### Testes

```bash
npm test                       # Todos os testes
npm run test:headed            # Com navegador
npm run test:debug             # Modo debug
npm run test:ui                # Interface visual
npm run test:codegen           # Gerar seletores
npm run test:report            # Ver relatório
```

### Qualidade

```bash
npm run lint                   # Code style
npm run format                 # Formatar
npm run typecheck              # Validar tipos
```

---

## 📊 Estrutura de Teste

Cada teste deve seguir este padrão:

```typescript
import { test, expect } from '@playwright/test';
import { createEvidenciaHelper, loadEnv, validateEnv } from '../helpers/evidencia-helper';

test.describe('Funcionalidade X', () => {

  test.beforeAll(() => {
    loadEnv('sistema1');
    validateEnv(['SISTEMA_BASE_URL', 'SISTEMA_USER']);
  });

  test('deve fazer ação Y', async ({ page }, testInfo) => {
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema1');

    await test.step('Step 1: Ação A', async () => {
      // Implementação
      await tiraFoto('01-descricao');
    });

    await test.step('Step 2: Ação B', async () => {
      // Implementação
      await tiraFoto('02-descricao');
    });

    await test.step('Step 3: Validar resultado', async () => {
      // Assertions
      await expect(...).toBeVisible();
    });
  });
});
```

---

## 📈 Escalabilidade

### Adicionar Novo Sistema

1. **Criar arquivo `.env.{sistema}`:**

   ```bash
   cp .env.example .env.sistema3
   code .env.sistema3
   ```

2. **Criar pasta de testes:**

   ```bash
   mkdir -p tests/sistema3
   touch tests/sistema3/exemplo.spec.ts
   ```

3. **Criar pasta de evidências:**

   ```bash
   mkdir -p tests/evidencias/sistema3
   ```

4. **Usar no teste:**
   ```typescript
   loadEnv('sistema3');
   const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema3');
   ```

### Adicionar Novo Tipo de Teste

1. Criar arquivo: `tests/{sistema}/{funcionalidade}.spec.ts`
2. Seguir padrão de `exemplo-login.spec.ts`
3. Validar com [04-CHECKLIST_QUALIDADE.md](docs/04-CHECKLIST_QUALIDADE.md)

---

## 🔗 Referências Rápidas

| Necessidade             | Documento                                                   |
| ----------------------- | ----------------------------------------------------------- |
| Aprender padrões        | [01-BOAS_PRATICAS.md](docs/01-BOAS_PRATICAS.md)             |
| Usar seletores robustos | [02-SELETORES_ROBUSTOS.md](docs/02-SELETORES_ROBUSTOS.md)   |
| Configurar ambiente     | [03-VARIAVEIS_AMBIENTE.md](docs/03-VARIAVEIS_AMBIENTE.md)   |
| Validar qualidade       | [04-CHECKLIST_QUALIDADE.md](docs/04-CHECKLIST_QUALIDADE.md) |
| Executar testes         | `bash scripts/run-tests.sh`                                 |

---

## 🎯 Próximos Passos

1. ✅ Estrutura criada
2. ⏭️ [Setup inicial](#-setup-inicial)
3. ⏭️ Configurar `.env.sistema1`
4. ⏭️ Executar primeiro teste
5. ⏭️ Criar novos testes seguindo [01-BOAS_PRATICAS.md](docs/01-BOAS_PRATICAS.md)

---

**Desenvolvido com Playwright + MCP**
