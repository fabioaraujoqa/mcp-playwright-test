const fs = require('fs/promises');
const path = require('path');

/* eslint-disable no-console */

/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').TestInfo} TestInfo */

/**
 * Helper para criar evidências (screenshots) em testes
 *
 * Uso:
 * ```javascript
 * const tiraFoto = await createEvidenciaHelper(page, testInfo, 'login');
 * await tiraFoto('01-página-inicial');
 * ```
 * @param {Page} page
 * @param {TestInfo} testInfo
 * @param {string} [sistema]
 */
async function createEvidenciaHelper(page, testInfo, sistema = 'geral') {
  // Criar pasta de evidências
  const pastaBase = path.join('tests', 'evidencias', sistema);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await fs.mkdir(pastaBase, { recursive: true });

  // Timestamp para agrupar evidências do mesmo teste
  const ts = new Date().toISOString().replace(/[:.]/g, '-');

  // Sequência de fotos (01, 02, 03...)
  let seq = 1;

  /**
   * Tira screenshot e salva
   * @param {string} rotulo - Descrição breve da captura (ex: "login-realizado")
   */
  return async (rotulo) => {
    // Sanitizar nome do arquivo
    const rotuloSanitizado = rotulo
      .toLowerCase()
      .replace(/[^a-z0-9-_]/gi, '_')
      .substring(0, 50);

    const nomeArquivo = `${String(seq).padStart(2, '0')}-${ts}-${rotuloSanitizado}.png`;
    const caminhoArquivo = path.join(pastaBase, nomeArquivo);

    // Tirar screenshot
    await page.screenshot({
      path: caminhoArquivo,
      fullPage: true,
    });

    // Anexar ao relatório do Playwright
    await testInfo.attach(`evidencia-${String(seq).padStart(2, '0')}-${rotulo}`, {
      path: caminhoArquivo,
      contentType: 'image/png',
    });

    // Incrementar sequência
    seq++;

    console.log(`📸 Evidência salva: ${nomeArquivo}`);
  };
}

/**
 * Helper para carregar variáveis de ambiente por sistema
 *
 * Uso:
 * ```javascript
 * loadEnv('sistema1');
 * const user = process.env.SISTEMA_USER;
 * ```
 * @param {string} sistema
 */
function loadEnv(sistema) {
  const dotenv = require('dotenv');
  const envPath = require('path').resolve(`.env.${sistema}`);

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw new Error(`❌ Arquivo .env.${sistema} não encontrado`);
  }

  console.log(`✅ Variáveis carregadas de .env.${sistema}`);
}

/**
 * Validar que variáveis de ambiente obrigatórias existem
 *
 * Uso:
 * ```javascript
 * validateEnv(['SISTEMA_USER', 'SISTEMA_PASSWORD']);
 * ```
 * @param {string[]} requiredVars
 */
function validateEnv(requiredVars) {
  const missing = requiredVars.filter((/** @type {string} */ v) => {
    // eslint-disable-next-line security/detect-object-injection
    return !process.env[v];
  });

  if (missing.length > 0) {
    throw new Error(`❌ Variáveis obrigatórias não encontradas: ${missing.join(', ')}`);
  }

  console.log(`✅ Todas as variáveis obrigatórias estão presentes`);
}

/**
 * Esperar por elemento e fazer screenshot
 * Útil para debug
 * @param {Page} page
 * @param {string} selector
 * @param {TestInfo} testInfo
 * @param {string} label
 */
async function waitAndScreenshot(page, selector, testInfo, label) {
  const tiraFoto = await createEvidenciaHelper(page, testInfo);
  await page.locator(selector).waitFor();
  await tiraFoto(label);
}

module.exports = {
  createEvidenciaHelper,
  loadEnv,
  validateEnv,
  waitAndScreenshot,
};
