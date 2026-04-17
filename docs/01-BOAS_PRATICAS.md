# 📚 Boas Práticas – Padrão de Automação

Este documento define as **boas práticas** que devem ser seguidas em todos os testes deste projeto.

---

## 🎯 Princípios Fundamentais

### **1. Pré-requisitos**

- ✅ Sempre verificar variáveis de ambiente antes do teste
- ✅ Validar conectividade com o sistema antes de iniciar
- ✅ Confirmar permissões do usuário de teste

### **2. Seletores Robustos**

**Hierarquia de Prioridade (em ordem):**

1. **Prioridade 1 - Acessibilidade (RECOMENDADO)**
   - `getByRole()` - Mais semântico
   - `getByLabel()` - Campos com label
   - `getByPlaceholder()` - Placeholders
   - `getByTestId()` - Data-testid específico

2. **Prioridade 2 - Atributos Semânticos**
   - `[aria-label]`
   - `[title]`
   - `[data-*]` attributes

3. **Prioridade 3 - Fallbacks (com cuidado)**
   - Seletores combinados com `.or()`
   - Seletores com múltiplas opções

4. **❌ NUNCA usar:**
   - `#id123` - IDs hardcoded
   - `.class-generated-abc` - Classes voláteis
   - `:nth-child(3)` - By position
   - `div > span` - Seletores muito específicos

**Exemplo:**

```typescript
// ✅ BOM
const loginBtn = page.getByRole('button', { name: /entrar/i });

// ✅ ACEITÁVEL (com fallback)
const userMenu = page
  .getByRole('button', { name: /perfil/i })
  .or(page.locator('[aria-label="Menu do usuário"]'));

// ❌ RUIM
const btn = page.locator('#loginButton');
```

### **3. Sincronização**

**❌ NUNCA use `waitForTimeout()`**

**✅ SEMPRE use asserts sincronizados:**

```typescript
// Aguardar elemento aparecer
await expect(page.locator('.modal')).toBeVisible();

// Aguardar URL mudar
await expect(page).toHaveURL(/dashboard/);

// Aguardar texto aparecer
await expect(page.getByText('Bem-vindo')).toBeVisible();

// Polling para valores dinâmicos
await expect
  .poll(async () => {
    return await page.locator('.counter').textContent();
  })
  .toBe('5');
```

### **4. Estrutura de Teste**

Cada ação deve estar dentro de um `test.step()`:

```typescript
test('deve fazer login com sucesso', async ({ page }, testInfo) => {
  await test.step('Navegar até página de login', async () => {
    await page.goto('https://app.com/login');
    await expect(page).toHaveURL(/login/);
  });

  await test.step('Preencher credenciais', async () => {
    await page.getByLabel(/email/i).fill('user@example.com');
    await page.getByLabel(/password/i).fill('password123');
  });

  await test.step('Clicar em entrar', async () => {
    await page.getByRole('button', { name: /entrar/i }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  await test.step('Validar dashboard carregado', async () => {
    await expect(page.getByText(/bem-vindo/i)).toBeVisible();
  });
});
```

### **5. Regex Case-Insensitive**

Sempre use flag `/i` para case-insensitive:

```typescript
// ✅ BOM
page.getByRole('button', { name: /entrar/i });
page.getByText(/bem-vindo/i);
page.getByLabel(/email|user/i);

// ❌ RUIM - Quebra se texto for "ENTRAR" ou "Entrar"
page.getByRole('button', { name: 'entrar' });
```

### **6. Evidências**

Capturar evidências em pontos críticos:

```typescript
import { createEvidenciaHelper } from '../helpers/evidencia-helper';

test('teste exemplo', async ({ page }, testInfo) => {
  const tiraFoto = await createEvidenciaHelper(page, testInfo, 'login');

  await page.goto('https://app.com/login');
  await tiraFoto('01-pagina-login-carregada');

  await page.getByLabel(/email/i).fill('user@example.com');
  await tiraFoto('02-email-preenchido');

  await page.getByRole('button', { name: /entrar/i }).click();
  await tiraFoto('03-apos-clique-em-entrar');

  await expect(page).toHaveURL(/dashboard/);
  await tiraFoto('04-dashboard-carregado');
});
```

**Nomenclatura:**

- `01-timestamp-descricao.png`
- `02-timestamp-descricao.png`
- Ordem sequencial, descritivo

---

## 🏗️ Estrutura de Pasta de Evidências

```
tests/
├── evidencias/
│   ├── login/
│   │   ├── 01-2025-03-11T10-30-45-pagina-login-carregada.png
│   │   ├── 02-2025-03-11T10-30-45-email-preenchido.png
│   │   └── 03-2025-03-11T10-30-45-dashboard-carregado.png
│   └── checkout/
│       └── ...
```

---

## ✅ Checklist de Qualidade

**Antes de commitar seu teste:**

- [ ] Variáveis de ambiente configuradas (`.env.example`)
- [ ] Todos os seletores usam Prioridade 1 ou 2
- [ ] Zero `waitForTimeout()` - apenas asserts
- [ ] Cada ação dentro de `test.step()`
- [ ] Evidências em pontos críticos
- [ ] Teste executa 3x seguidas com sucesso
- [ ] Teste funciona em modo headless
- [ ] Credenciais não estão hardcoded
- [ ] Navegador é fechado ao final

---

## 🚨 Red Flags - Pare e Revise

Se seu teste tem qualquer um desses:

- ❌ `waitForTimeout()` sem sincronização
- ❌ Seletores frágeis: `#id123`, `.generated-class-999`
- ❌ Testes que falham esporadicamente
- ❌ Evidências não sendo geradas
- ❌ Navegador não fechando
- ❌ Credenciais ou dados sensíveis no código
- ❌ Seletores quebram com pequenas mudanças na UI

**Revise e corrija antes de submeter!**

---

## 📚 Referências

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/locators)
- [Test Authoring](https://playwright.dev/docs/test-assertions)
