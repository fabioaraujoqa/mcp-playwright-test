const { test, expect } = require('@playwright/test');
const { createEvidenciaHelper } = require('../helpers/evidencia-helper');

require('dotenv').config();

/**
 * Testes de Cadastro - DevReferências
 *
 * Pré-requisitos:
 * - Arquivo .env configurado com PASSWORD
 * - SISTEMA_BASE_URL apontando para devreferencias.com.br
 *
 * Observação: o e-mail usa timestamp para evitar conflito em múltiplas execuções.
 */
test.describe('Cadastro - DevReferências', () => {
  // Gera um e-mail único por execução para não conflitar
  const emailUnico = `teste.${Date.now()}@devref.test`;
  const senha = process.env.PASSWORD ?? '';
  const nomeCompleto = 'Dev Referências Test';

  test('deve realizar cadastro com sucesso', async ({ page }, testInfo) => {
    const tiraFoto = await createEvidenciaHelper(page, testInfo, 'devreferencias');

    // ──────────────────────────────────────────
    // Step 1: Navegar até a página de cadastro
    // ──────────────────────────────────────────
    await test.step('Acessar página de cadastro', async () => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Cadastrar' }).click();

      await expect(page).toHaveURL(/Register/i);
      await expect(page.getByRole('heading', { name: 'Crie sua conta' })).toBeVisible();

      await tiraFoto('01-pagina-cadastro');
    });

    // ──────────────────────────────────────────
    // Step 2: Preencher formulário
    // ──────────────────────────────────────────
    await test.step('Preencher dados de cadastro', async () => {
      await page.getByRole('textbox', { name: 'Nome Completo' }).fill(nomeCompleto);
      await page.getByRole('textbox', { name: 'E-mail' }).fill(emailUnico);
      await page.getByRole('textbox', { name: 'Senha', exact: true }).fill(senha);
      await page.getByRole('textbox', { name: 'Confirmar Senha' }).fill(senha);

      await tiraFoto('02-formulario-preenchido');
    });

    // ──────────────────────────────────────────
    // Step 3: Submeter e validar sucesso
    // ──────────────────────────────────────────
    await test.step('Submeter cadastro e validar redirecionamento', async () => {
      await page.getByRole('button', { name: 'Criar conta' }).click();

      // Após cadastro bem-sucedido, deve redirecionar para a home
      await expect(page).toHaveURL(/devreferencias\.com\.br\/$/);

      // Nome do usuário deve aparecer na navbar
      await expect(page.getByRole('button', { name: nomeCompleto })).toBeVisible();

      await tiraFoto('03-cadastro-realizado');
    });

    // ──────────────────────────────────────────
    // Step 4: Cleanup - Logout
    // ──────────────────────────────────────────
    await test.step('Fazer logout após cadastro', async () => {
      await page.getByRole('button', { name: 'Sair' }).click();

      // Após logout, botões de Entrar e Cadastrar devem ser visíveis novamente
      await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();

      await tiraFoto('04-logout-realizado');
    });
  });
});
