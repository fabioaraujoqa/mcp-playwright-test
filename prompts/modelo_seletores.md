# Estratégias para Seletores Robustos - Melhorias nos Prompts

## ❌ Problemas Identificados nos Testes Atuais

### Seletores Frágeis Encontrados:

- `#userOptions` - ID específico que pode mudar
- `#logoutSystem` - ID específico que pode mudar
- `#messagebox-close` - ID gerado dinamicamente
- Classes CSS voláteis como `.generated-class-123`

### Padrões que Quebram:

1. **IDs hardcoded** - mudam entre versões
2. **Classes geradas** - mudam a cada build
3. **Seletores por índice** - `.first()` sem contexto
4. **Seletores únicos** - sem fallbacks

## ✅ Estratégias de Seletores Robustos

### 1. **Hierarquia de Prioridade de Seletores**

```typescript
// 🥇 PRIORIDADE 1: Acessibilidade (mais estável)
page.getByRole('button', { name: 'Sair' });
page.getByLabel('Nome de usuário');
page.getByPlaceholder('Digite seu CPF');

// 🥈 PRIORIDADE 2: Atributos semânticos
page.getByTestId('user-menu');
page.locator('[aria-label="Menu do usuário"]');
page.locator('[title="Fazer logout"]');

// 🥉 PRIORIDADE 3: Seletores com fallback
page.locator('#userOptions, .user-menu, [aria-label*="usuário"]');
page.locator('button:has-text("Entrar"), input[value="Entrar"]');

// ❌ EVITAR: Seletores frágeis
page.locator('#userOptions'); // ID único sem fallback
page.locator('.css-abc123'); // Classe gerada
page.locator('div:nth-child(3)'); // Posição específica
```

### 2. **Padrões Robustos por Tipo de Elemento**

#### Login/Logout:

```typescript
// ❌ Frágil
await page.locator('#userOptions').click();
await page.locator('#logoutSystem').click();

// ✅ Robusto
const userMenu = page
  .getByRole('button', { name: /perfil|conta|usuário/i })
  .or(page.locator('[aria-label*="usuário"], [aria-label*="perfil"], .user-menu'));
await userMenu.click();

const logoutBtn = page
  .getByRole('button', { name: /sair|logout|desconectar/i })
  .or(page.locator('[title*="logout"], [aria-label*="sair"], .logout-btn'));
await logoutBtn.click();
```

#### Formulários:

```typescript
// ❌ Frágil
await page.locator('#username').fill('user');

// ✅ Robusto
const usernameField = page
  .getByLabel(/usuário|username|login/i)
  .or(page.getByPlaceholder(/usuário|username|login/i))
  .or(page.locator('input[name*="user"], input[id*="user"]'));
await usernameField.fill('user');
```

#### Tabelas/Grids:

```typescript
// ❌ Frágil
await page.locator('.grid-row').first().click();

// ✅ Robusto - Por conteúdo específico
const orderRow = page.locator('tr, .grid-row, .table-row').filter({ hasText: numeroOS });
await orderRow.click();

// ✅ Robusto - Por atributo de dados
const orderRow = page.locator(`[data-order="${numeroOS}"], [data-id="${numeroOS}"]`);
await orderRow.click();
```

#### Alertas/Modais:

```typescript
// ❌ Frágil
await page.locator('#messagebox-close').click();

// ✅ Robusto
const closeAlert = page
  .getByRole('button', { name: /fechar|ok|confirmar|cancelar/i })
  .or(
    page.locator('[aria-label*="fechar"], .close, .modal-close, .dialog-close, [title*="fechar"]'),
  );
if (await closeAlert.isVisible()) {
  await closeAlert.click();
}
```

### 3. **Estratégias de Espera Inteligente**

```typescript
// ❌ Frágil
await page.waitForTimeout(3000);

// ✅ Robusto
await expect(page.getByText('Carregando...')).toBeHidden();
await expect(page.getByText('Bem-vindo')).toBeVisible();

// ✅ Robusto com polling
await expect
  .poll(async () => {
    return await page.locator('.content').count();
  })
  .toBeGreaterThan(0);
```

### 4. **Seletores com Múltiplos Fallbacks**

```typescript
// Template para seletores robustos
const createRobustSelector = (page, options) => {
  const selectors = [
    options.role && page.getByRole(options.role, { name: options.name }),
    options.label && page.getByLabel(options.label),
    options.testId && page.getByTestId(options.testId),
    options.aria && page.locator(`[aria-label*="${options.aria}"]`),
    options.title && page.locator(`[title*="${options.title}"]`),
    options.class && page.locator(`.${options.class}`),
    options.id && page.locator(`#${options.id}`),
  ].filter(Boolean);

  return selectors.reduce((acc, selector) => acc.or(selector));
};

// Uso:
const loginButton = createRobustSelector(page, {
  role: 'button',
  name: /entrar|login/i,
  testId: 'login-btn',
  aria: 'entrar',
  title: 'fazer login',
  class: 'login-button',
  id: 'btnLogin',
});
```

## 🎯 Regras para os Prompts Atualizados

### Para DigiIguá:

- Sempre usar `getByRole` primeiro
- Fallback com `getByText` usando regex case-insensitive
- Evitar seletores de classe específica
- Usar contexto de seção quando possível

### Para Sansys:

- Mapear IDs conhecidos que quebram: `#userOptions`, `#logoutSystem`
- Criar aliases robustos para elementos comuns
- Usar atributos `data-*` quando disponíveis
- Implementar retry automático para elementos instáveis

### Para todos os sistemas:

- **Sempre** implementar fallbacks múltiplos
- **Sempre** usar regex case-insensitive para textos
- **Sempre** validar existência antes de interagir
- **Sempre** aguardar estado estável após ações
