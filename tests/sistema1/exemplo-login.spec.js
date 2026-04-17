const { test, expect } = require('@playwright/test');
const { createEvidenciaHelper, loadEnv, validateEnv } = require('../helpers/evidencia-helper');

/**
 * EXEMPLO DE TESTE - Padrão a ser seguido
 *
 * Este arquivo demonstra boas práticas:
 * - Variáveis de ambiente seguras
 * - Seletores robustos (getByRole, getByLabel)
 * - test.step() para organizar ações
 * - Evidências em pontos críticos
 * - Sincronização com expect()
 */

test.describe('Sistema 1 - Exemplo de Automação', () => {
  test.beforeAll(() => {
    // Carregar variáveis de ambiente
    loadEnv('sistema1');

    // Validar que variáveis obrigatórias existem
    validateEnv(['SISTEMA_BASE_URL', 'SISTEMA_USER', 'SISTEMA_PASSWORD']);
  });

  /**
   * Caso de teste: Login bem-sucedido
   *
   * Pré-requisitos:
   * - Arquivo .env.sistema1 configurado
   * - Aplicação acessível em SISTEMA_BASE_URL
   * - Credenciais válidas
   *
   * Cenário:
   * 1. Navegar até página de login
   * 2. Preencher email e senha
   * 3. Clicar em "Entrar"
   * 4. Validar redirecionamento para dashboard
   * 5. Capturar evidências
   */
  test('deve fazer login com sucesso', async ({ page }, testInfo) => {
    // Criar helper de evidências
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema1');

    // ============================================
    // Step 1: Navegar até página de login
    // ============================================
    await test.step('Navegar até página de login', async () => {
      const baseUrl = process.env.SISTEMA_BASE_URL ?? '';

      await page.goto(baseUrl);

      // Validar que página de login carregou
      await expect(page.getByRole('heading', { name: /login|entrar/i })).toBeVisible();

      await tiraFoto('01-pagina-login-carregada');
    });

    // ============================================
    // Step 2: Preencher credenciais
    // ============================================
    await test.step('Preencher email e senha', async () => {
      const user = process.env.SISTEMA_USER ?? '';
      const pass = process.env.SISTEMA_PASSWORD ?? '';

      // Usar getByLabel para campos com label (mais robusto)
      const emailInput = page.getByLabel(/email|usuário|login/i);
      const passwordInput = page.getByLabel(/senha|password/i);

      await emailInput.fill(user);
      await expect(emailInput).toHaveValue(user);

      await tiraFoto('02-email-preenchido');

      await passwordInput.fill(pass);
      await expect(passwordInput).toHaveValue(pass);

      await tiraFoto('03-senha-preenchida');
    });

    // ============================================
    // Step 3: Clicar em "Entrar"
    // ============================================
    await test.step('Clicar em Entrar', async () => {
      const botaoEntrar = page.getByRole('button', { name: /entrar|login|acessar/i });

      await botaoEntrar.click();

      // Usar timeout implícito para sincronização
      await page.waitForLoadState('domcontentloaded');

      await tiraFoto('04-apos-clique-entrar');
    });

    // ============================================
    // Step 4: Validar dashboard
    // ============================================
    await test.step('Validar dashboard carregado', async () => {
      // Esperar pela URL do dashboard
      await expect(page).toHaveURL(/dashboard|home|inicio|principal/i);

      // Validar elemento de boas-vindas
      const bemVindo = page.getByText(/bem-vindo|olá|bem-vindo|welcome/i);
      await expect(bemVindo).toBeVisible();

      await tiraFoto('05-dashboard-carregado');
    });

    // ============================================
    // Step 5: Fazer logout
    // ============================================
    await test.step('Fazer logout', async () => {
      // Procurar por menu ou botão de usuário
      // (Cleanup condicional: o logout pode não estar disponível em todos os ambientes)
      // eslint-disable-next-line playwright/no-conditional-in-test
      const userMenu = page
        .getByRole('button', { name: /perfil|usuário|conta|menu/i })
        .or(page.locator('[aria-label*="usuário"]'));

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (await userMenu.isVisible()) {
        await userMenu.click();
      }

      // Procurar por botão de logout
      const logoutBtn = page
        .getByRole('button', { name: /sair|logout|desconectar/i })
        .or(page.locator('[title*="sair"], .logout-btn'));

      // eslint-disable-next-line playwright/no-conditional-in-test, playwright/no-conditional-expect
      if (await logoutBtn.isVisible()) {
        await logoutBtn.click();

        // Validar que voltou para login
        // eslint-disable-next-line playwright/no-conditional-expect
        await expect(page).toHaveURL(/login|signin/i, { timeout: 10000 });

        await tiraFoto('06-logout-realizado');
      }
    });
  });

  /**
   * (Opcional) Teste adicional: Login com falha
   */
  test('deve falhar ao fazer login com credenciais inválidas', async ({ page }, testInfo) => {
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'sistema1');

    const baseUrl = process.env.SISTEMA_BASE_URL ?? '';

    await page.goto(baseUrl);

    await test.step('Preencher credenciais inválidas', async () => {
      const emailInput = page.getByLabel(/email|usuário/i);
      const passwordInput = page.getByLabel(/senha|password/i);

      await emailInput.fill('usuario_invalido@example.com');
      await passwordInput.fill('senha_incorreta_12345');

      await tiraFoto('01-credenciais-invalidas-preenchidas');
    });

    await test.step('Clicar em Entrar', async () => {
      const botaoEntrar = page.getByRole('button', { name: /entrar|login/i });
      await botaoEntrar.click();
    });

    await test.step('Validar mensagem de erro', async () => {
      const mensagemErro = page.getByText(
        /credenciais inválidas|email ou senha incorretos|falha|erro/i,
      );

      await expect(mensagemErro).toBeVisible({ timeout: 5000 });

      await tiraFoto('02-mensagem-erro-apareceu');
    });
  });
});
