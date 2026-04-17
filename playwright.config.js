const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuração do Playwright para testes automatizados
 *
 * Documentação: https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // Quantidade de testes a rodar em paralelo
  fullyParallel: true,

  // Parar na primeira falha?
  forbidOnly: !!process.env.CI,

  // Retry em testes que falharam
  retries: process.env.CI ? 2 : 1,

  // Quantidade de workers em paralelo
  workers: process.env.CI ? 1 : undefined,

  // Reporter HTML e de linha de comando
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Timeout global para teste
  timeout: 30 * 1000,

  // Timeout para expect
  expect: {
    timeout: 5 * 1000,
  },

  use: {
    // URL base para testes
    baseURL: process.env.SISTEMA_BASE_URL || 'http://localhost:3000',

    // Tirar screenshot em caso de falha
    screenshot: 'only-on-failure',

    // Gravar vídeo em caso de falha
    video: 'retain-on-failure',

    // Slow down (para debug)
    slowMo: 0,

    // Trace em caso de falha (para debugging)
    trace: 'on-first-retry',
  },

  // Configuração de projetos
  // Apenas Chromium — alinhado com o ambiente de CI (GitHub Actions)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Executar 'npm run start' antes dos testes?
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
