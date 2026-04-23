const { test, expect } = require('@playwright/test');
const { createEvidenciaHelper } = require('../helpers/evidencia-helper');

// override: true garante que .env sobrescreve variáveis de sistema (ex: USER no macOS)
const { parsed: envFile } = require('dotenv').config({ override: true });

/**
 * Testes de Login - DevReferências
 *
 * Pré-requisitos:
 * - Arquivo .env configurado com USER e PASSWORD
 * - Usuário já cadastrado no sistema
 * - SISTEMA_BASE_URL apontando para devreferencias.com.br
 */
test.describe('Login - DevReferências', () => {
  const email = envFile?.USER ?? '';
  const senha = envFile?.PASSWORD ?? '';

  test('deve fazer login com sucesso', async ({ page }, testInfo) => {
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'devreferencias');

    // ──────────────────────────────────────────
    // Step 1: Navegar até a página de login
    // ──────────────────────────────────────────
    await test.step('Acessar página de login', async () => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Entrar' }).click();

      await expect(page).toHaveURL(/Login/i);
      await expect(page.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeVisible();

      await tiraFoto('01-pagina-login');
    });

    // ──────────────────────────────────────────
    // Step 2: Preencher credenciais
    // ──────────────────────────────────────────
    await test.step('Preencher e-mail e senha', async () => {
      await page.getByRole('textbox', { name: 'E-mail' }).fill(email);
      await page.getByRole('textbox', { name: 'Senha' }).fill(senha);

      await tiraFoto('02-credenciais-preenchidas');
    });

    // ──────────────────────────────────────────
    // Step 3: Submeter e validar autenticação
    // ──────────────────────────────────────────
    await test.step('Submeter login e validar autenticação', async () => {
      await page.getByRole('button', { name: 'Entrar' }).click();

      // Após login, deve redirecionar para a home
      await expect(page).toHaveURL(/devreferencias\.com\.br\/$/);

      // Nome do usuário deve aparecer na navbar, confirma sessão ativa
      await expect(page.getByRole('button', { name: /Dev Referências Test/i })).toBeVisible();

      // Botão "Sair" deve estar visível
      await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible();

      await tiraFoto('03-login-realizado');
    });

    // ──────────────────────────────────────────
    // Step 4: Cleanup - Logout
    // ──────────────────────────────────────────
    await test.step('Fazer logout', async () => {
      await page.getByRole('button', { name: 'Sair' }).click();

      // Após logout, botões de Entrar e Cadastrar devem ser visíveis novamente
      await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Cadastrar' })).toBeVisible();

      await tiraFoto('04-logout-realizado');
    });
  });

  test('deve rejeitar login com credenciais inválidas', async ({ page }, testInfo) => {
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'devreferencias');

    await test.step('Acessar página de login', async () => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Entrar' }).click();

      await expect(page).toHaveURL(/Login/i);
    });

    await test.step('Preencher credenciais inválidas', async () => {
      await page.getByRole('textbox', { name: 'E-mail' }).fill('invalido@devref.test');
      await page.getByRole('textbox', { name: 'Senha' }).fill('senha_errada');

      await tiraFoto('01-credenciais-invalidas');
    });

    await test.step('Validar mensagem de erro', async () => {
      await page.getByRole('button', { name: 'Entrar' }).click();

      // Deve permanecer na página de login
      await expect(page).toHaveURL(/Login/i);

      // Deve exibir mensagem de erro
      await expect(page.getByText(/inválid|incorret|não encontrad|erro/i)).toBeVisible();

      await tiraFoto('02-erro-credenciais-invalidas');
    });
  });
});
