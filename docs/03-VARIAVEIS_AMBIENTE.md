# 🔐 Guia de Variáveis de Ambiente

Gerenciar credenciais de forma **segura** e **organizada**.

---

## 📋 Visão Geral

Este projeto usa arquivos `.env` separados por sistema para manter credenciais **fora do Git**.

## 🗂️ Estrutura de Arquivos

```
projeto/
├── .env.example          # Template (COMMITAR)
├── .env.sistema1         # Credenciais Sistema 1 (GITIGNORE)
├── .env.sistema2         # Credenciais Sistema 2 (GITIGNORE)
└── .gitignore           # Garante que .env* não são commitados
```

**`.gitignore` (já configurado):**

```
.env
.env.*
!.env.example
```

---

## 🚀 Como Usar

### 1. Setup Inicial

**Copie o `.env.example`:**

```bash
cp .env.example .env.sistema1
cp .env.example .env.sistema2
```

**Edite com suas credenciais:**

```bash
# VS Code
code .env.sistema1

# Ou seu editor favorito
nano .env.sistema1
```

### 2. Nos Testes

```typescript
import { loadEnv, validateEnv } from '../helpers/env-loader';

test.describe('Login', () => {
  test.beforeAll(() => {
    // Carregar variáveis
    loadEnv('sistema1');

    // Validar obrigatórias
    validateEnv(['SISTEMA_USER', 'SISTEMA_PASSWORD']);
  });

  test('deve fazer login', async ({ page }) => {
    const baseUrl = process.env.SISTEMA_BASE_URL;
    const user = process.env.SISTEMA_USER;
    const pass = process.env.SISTEMA_PASSWORD;

    await page.goto(baseUrl!);
    await page.getByLabel(/email/i).fill(user!);
    await page.getByLabel(/senha/i).fill(pass!);
    await page.getByRole('button', { name: /entrar/i }).click();
  });
});
```

---

## 📝 Variáveis Disponíveis

### `.env.example` (Template Base)

```env
# ==================================
# Sistema 1
# ==================================
SISTEMA_BASE_URL=https://sistema1.com.br
SISTEMA_USER=usuario_teste
SISTEMA_PASSWORD=senha123
SISTEMA_TIMEOUT=5000
SISTEMA_EVIDENCIAS_DIR=tests/evidencias/sistema1

# ==================================
# Sistema 2
# ==================================
SISTEMA2_BASE_URL=https://sistema2.com.br
SISTEMA2_USER=usuario_teste
SISTEMA2_PASSWORD=senha123
SISTEMA2_TIMEOUT=5000
SISTEMA2_EVIDENCIAS_DIR=tests/evidencias/sistema2

# ==================================
# Configurações Globais
# ==================================
ENV=test
SCREENSHOTS_ON_FAILURE=true
HEADED_MODE=false
```

### Padrão de Nomenclatura

Para adicionar novo sistema, siga o padrão:

```env
NOMEDOSISTEMA_BASE_URL=...
NOMEDOSISTEMA_USER=...
NOMEDOSISTEMA_PASSWORD=...
NOMEDOSISTEMA_TIMEOUT=...
NOMEDOSISTEMA_EVIDENCIAS_DIR=...
```

**Exemplos:**

- `SANSYS_BASE_URL`
- `SALESFORCE_BASE_URL`
- `MERCADOLIVRE_BASE_URL`

---

## 🔒 Segurança - Checklist Obrigatório

### ✅ O que FAZER:

```bash
# ✅ Verificar que .env* está no .gitignore
cat .gitignore | grep ".env"

# ✅ Verificar que não há .env* commitados
git status | grep ".env"

# ✅ Compartilhar credenciais por canais seguros
# (Vault, 1Password, Bitwarden, email criptografado)

# ✅ Rotacionar senhas periodicamente
# (A cada 3 meses, por exemplo)
```

### ❌ O que NUNCA fazer:

```typescript
// ❌ NUNCA hardcode credenciais
const user = 'usuario_teste';
const pass = 'senha123';

// ❌ NUNCA commite .env com dados reais
git commit -m "adicionar .env" .env.sistema1

// ❌ NUNCA compartilhe credenciais em chat/email
// ❌ NUNCA use credenciais de produção em testes
```

---

## 🚨 Troubleshooting

### Erro: "Cannot find module 'dotenv'"

**Solução:** Instalar dependência

```bash
npm install --save-dev dotenv
```

### Erro: ".env.xxx not found"

**Solução:** Verificar se arquivo existe

```bash
ls -la .env.*
# Deve listar: .env.exemplo, .env.sistema1, etc.
```

### Erro: "Required variable not found: SISTEMA_USER"

**Solução:** Editar arquivo `.env.sistema1` e adicionar a variável

```bash
code .env.sistema1
```

### Teste lê valor antigo de variável

**Solução:** Node armazena em cache. Reinicie:

```bash
# Limpar cache
npm test -- --no-cache

# Ou reiniciar processo
npx playwright test seu-teste.spec.ts
```

---

## 📚 Exemplo Completo

### `.env.example` (commitar)

```env
SISTEMA_BASE_URL=https://app.example.com
SISTEMA_USER=usuario_teste
SISTEMA_PASSWORD=senha_teste
SISTEMA_TIMEOUT=5000
SISTEMA_EVIDENCIAS_DIR=tests/evidencias/sistema
```

### `.env.sistema1` (NÃO commitar)

```env
SISTEMA_BASE_URL=https://producao.empresa.com.br
SISTEMA_USER=joao.silva@empresa.com.br
SISTEMA_PASSWORD=s3nh@f0rt3#2025
SISTEMA_TIMEOUT=10000
SISTEMA_EVIDENCIAS_DIR=tests/evidencias/sistema
```

### Teste usando variáveis

```typescript
import dotenv from 'dotenv';
import path from 'path';

test('login com variáveis de ambiente', async ({ page }) => {
  // Carregar .env.sistema1
  dotenv.config({ path: path.resolve('.env.sistema1') });

  const baseUrl = process.env.SISTEMA_BASE_URL;
  const user = process.env.SISTEMA_USER;
  const pass = process.env.SISTEMA_PASSWORD;

  await page.goto(baseUrl!);
  await page.getByLabel(/email|usuário/i).fill(user!);
  await page.getByLabel(/senha/i).fill(pass!);
  await page.getByRole('button', { name: /entrar/i }).click();

  await expect(page).toHaveURL(/dashboard/);
});
```

---

## 🔗 Referências

- [Dotenv Documentation](https://github.com/motdotla/dotenv)
- [Twelve-Factor App - Config](https://12factor.net/config)
- [Playwright Environment Variables](https://playwright.dev/docs/test-parameterize)
- [Node.js process.env](https://nodejs.org/api/process.html#process_process_env)
