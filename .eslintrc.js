/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'commonjs',
  },
  plugins: ['playwright', 'security'],
  extends: [
    'eslint:recommended',
    'plugin:playwright/recommended',
    'plugin:security/recommended-legacy',
  ],
  rules: {
    // -----------------------------------------------------------------------
    // Playwright — regras específicas
    // -----------------------------------------------------------------------

    // Proibir waitForTimeout hardcoded
    'playwright/no-wait-for-timeout': 'error',

    // Proibir page.pause() — trava execução em CI
    'playwright/no-page-pause': 'error',

    // Forçar await em métodos assíncronos do Playwright
    'playwright/missing-playwright-await': 'error',

    // Avisar sobre seletores CSS crus (prefer getByRole, getByLabel, etc.)
    'playwright/no-raw-locators': 'warn',

    // -----------------------------------------------------------------------
    // Segurança — via eslint-plugin-security
    // -----------------------------------------------------------------------

    // Proibir eval e equivalentes
    'security/detect-eval-with-expression': 'error',

    // Avisar sobre object injection com variável dinâmica
    'security/detect-object-injection': 'warn',

    // Proibir require() com variável dinâmica
    'security/detect-non-literal-require': 'error',

    // -----------------------------------------------------------------------
    // Qualidade geral
    // -----------------------------------------------------------------------

    // Variáveis declaradas mas nunca usadas
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Avisar sobre console.log deixado no código
    'no-console': 'warn',

    // Avisar sobre FIXMEs e HACKs esquecidos
    'no-warning-comments': ['warn', { terms: ['fixme', 'hack'], location: 'start' }],

    // Nota: detecção de segredos hardcoded é responsabilidade do Secretlint
    // (mais preciso e sem falsos positivos em nomes de variáveis de ambiente)
  },
  ignorePatterns: ['node_modules/', 'playwright-report/', 'test-results/', 'tests/evidencias/'],
};
